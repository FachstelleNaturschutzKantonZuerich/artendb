function(head, req) {
	var row, Objekt, total_rows,
		rückgabeObjekt = {},
		exportObjekte = [],
		exportObjekt,
		filterkriterien = [],
		filterkriterienObjekt,
		felder = [],
		gruppen,
		nur_ds,
		felderObjekt,
		objektHinzufügen,
		DsName_z,
		Feldname_z,
		Filterwert_z,
		Vergleichsoperator_z = "",
		Datensammlung,
		beziehungssammlungen, datensammlungen,
		beziehungssammlungen_aus_synonymen, datensammlungen_aus_synonymen,
		Beziehungssammlung,
		Beziehung,
		dsExistiertSchon,
		dsExistiert;
	// specify that we're providing a JSON response
	provides('json', function() {
		//übergebene Variabeln extrahieren
		for (var i in req.query) {
			if (i === "fasseTaxonomienZusammen") {
				//true oder false wird als String übergeben > umwandeln
				fasseTaxonomienZusammen = (req.query[i] === 'true');
			}
			if (i === "filter") {
				filterkriterienObjekt = JSON.parse(req.query[i]);
				filterkriterien = filterkriterienObjekt.rows;
			}
			if (i === "felder") {
				felderObjekt = JSON.parse(req.query[i]);
				felder = felderObjekt.rows;
			}
			if (i === "gruppen") {
				gruppen = req.query[i].split(",");
			}
			if (i === "nur_ds") {
				//true oder false wird als String übergeben > umwandeln
				nur_ds = (req.query[i] === 'true');
			}
		}

		total_rows = head.total_rows;
		//arrays für sammlungen aus synonymen gründen
		beziehungssammlungen_aus_synonymen = [];
		datensammlungen_aus_synonymen = [];

		for (var row_number=0; row_number<total_rows; row_number++) {
			row = getRow();
			Objekt = row.doc;

			//row.key[1] ist > 0, wenn es sich um eine Synonym handelt, dessen Informationen geholt werden sollen
			if (row.key[1] > 0) {
				if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<Objekt.Datensammlungen.length; i++) {
						//alle Datensammlungen übernehmen, wenn sie noch nicht enthalten sind
						if (!containsObject(Objekt.Datensammlungen[i], datensammlungen_aus_synonymen)) {
							datensammlungen_aus_synonymen.push(Objekt.Datensammlungen[i]);
						}
					}
					for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
						//alle Beziehungssammlungen übernehmen, wenn sie noch nicht enthalten sind
						if (!containsObject(Objekt.Beziehungssammlungen[i], beziehungssammlungen_aus_synonymen)) {
							beziehungssammlungen_aus_synonymen.push(Objekt.Beziehungssammlungen[i]);
						}
					}
				}
				//das war ein Synonym. Hier aufhören
				continue;
			}

			//wir sind jetzt im Originalobjekt
			//allfällige DS und BS aus Synonymen anhängen
			if (!Objekt.Datensammlungen) {
				Objekt.Datensammlungen = [];
			}
			if (datensammlungen_aus_synonymen.length > 0) {
				for (i=0; i<datensammlungen_aus_synonymen.length; i++) {
					if (!containsObject(datensammlungen_aus_synonymen[i], Objekt.Datensammlungen)) {
						Objekt.Datensammlungen.push(datensammlungen_aus_synonymen[i]);
					}
				}
			}
			if (!Objekt.Beziehungssammlungen) {
				Objekt.Beziehungssammlungen = [];
			}
			if (beziehungssammlungen_aus_synonymen.length > 0) {
				for (i=0; i<beziehungssammlungen_aus_synonymen.length; i++) {
					if (!containsObject(beziehungssammlungen_aus_synonymen[i], Objekt.Beziehungssammlungen)) {
						Objekt.Beziehungssammlungen.push(beziehungssammlungen_aus_synonymen[i]);
					}
				}
			}

			//wird true gesetzt, wenn in einem Feld ein Filterkriterium gesetzt und dieses erfüllt ist
			objektHinzufügen = false;
			//wird true gesetzt, wenn in einem Feld ein Filterkriterium gesetzt und dieses nicht erfüllt ist
			objektNichtHinzufügen = false;
			//exportobjekt zurücksetzen
			exportObjekt = {};

			//Filter nach Gruppen
			if (gruppen && gruppen.indexOf(Objekt.Gruppe) >= 0) {
				//Kriterium ist erfüllt
				if (filterkriterien.length > 0 || !nur_ds) {
					objektHinzufügen = true;
				}
			} else {
				//Kriterium ist nicht erfüllt > zum nächsten Objekt
				continue;
			}

			loop_filterkriterien:
			for (var z=0; z<filterkriterien.length; z++) {
				DsTyp_z = filterkriterien[z].DsTyp;
				DsName_z = filterkriterien[z].DsName;
				Feldname_z = filterkriterien[z].Feldname;
				Filterwert_z = filterkriterien[z].Filterwert;
				//prüfen, ob > oder < mitgegeben wurde
				if (Filterwert_z.indexOf(">=") === 0) {
					Vergleichsoperator_z = ">=";
					if (Filterwert_z.indexOf(" ") === 2) {
						Filterwert_z = Filterwert_z.slice(3);
					} else {
						Filterwert_z = Filterwert_z.slice(2);
					}
				}
				if (Filterwert_z.indexOf("<=") === 0) {
					Vergleichsoperator_z = "<=";
					if (Filterwert_z.indexOf(" ") === 2) {
						Filterwert_z = Filterwert_z.slice(3);
					} else {
						Filterwert_z = Filterwert_z.slice(2);
					}
				}
				if (Filterwert_z.indexOf(">") === 0) {
					Vergleichsoperator_z = ">";
					if (Filterwert_z.indexOf(" ") === 1) {
						Filterwert_z = Filterwert_z.slice(2);
					} else {
						Filterwert_z = Filterwert_z.slice(1);
					}
				}
				if (Filterwert_z.indexOf("<") === 0) {
					Vergleichsoperator_z = "<";
					if (Filterwert_z.indexOf(" ") === 1) {
						Filterwert_z = Filterwert_z.slice(2);
					} else {
						Filterwert_z = Filterwert_z.slice(1);
					}
				}
				if (DsName_z === "Objekt") {
					//Das ist eine simple Eigenschaft des Objekts - der view liefert hier als DsName Objekt
					if ((typeof Objekt[Feldname_z] === "number" && typeof Filterwert_z === "number" && Objekt[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
						if (filterkriterien.length > 0 || !nur_ds) {
							objektHinzufügen = true;
						}
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie" && fasseTaxonomienZusammen) {
					//das Feld ist aus Taxonomie und die werden zusammengefasst
					//daher die Taxonomie dieses Objekts ermitteln, um das Kriterium zu setzen, denn mitgeliefert wurde "Taxonomie(n)"
					if (Objekt.Taxonomie.Daten[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && typeof Filterwert_z === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							if (filterkriterien.length > 0 || !nur_ds) {
								objektHinzufügen = true;
							}
						} else {
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Taxonomie") {
					//das Feld ist aus Taxonomie und die werden nicht zusammengefasst
					if (Objekt.Taxonomie.Name === DsName_z && Objekt.Taxonomie.Daten[Feldname_z]) {
						if ((typeof Objekt.Taxonomie.Daten[Feldname_z] === "number" && typeof Filterwert_z === "number" && Objekt.Taxonomie.Daten[Feldname_z] === parseInt(Filterwert_z, 10)) || (Objekt.Taxonomie.Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0)) {
							if (filterkriterien.length > 0 || !nur_ds) {
								objektHinzufügen = true;
							}
						} else {
							objektNichtHinzufügen = true;
							break loop_filterkriterien;
						}
					} else {
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				} else if (DsTyp_z === "Beziehung") {
					//durch alle Beziehungssammlungen loopen und suchen, ob Filter trifft
					dsExistiert = false;
					for (var g=0; g<Objekt.Beziehungssammlungen.length; g++) {
						if (Objekt.Beziehungssammlungen[g].Name === DsName_z) {
							dsExistiert = true;
							//durch Beziehungssammlungen der Beziehung loopen
							if (Objekt.Beziehungssammlungen[g].Beziehungen.length > 0) {
								var feldExistiert = false;
								var feldHinzugefügt = false;
								for (var h=0; h<Objekt.Beziehungssammlungen[g].Beziehungen.length; h++) {
									//durch die Felder der Beziehung loopen
									if (Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]) {
										feldExistiert = true;
										//Feld kann string oder object sein. Object muss stringified werden
										if ((typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "number" && typeof Filterwert_z === "number" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === parseInt(Filterwert_z, 10)) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z]).toLowerCase().indexOf(Filterwert_z) >= 0) || (typeof Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z] === "string" && Objekt.Beziehungssammlungen[g].Beziehungen[h][Feldname_z].toLowerCase().indexOf(Filterwert_z) >= 0)) {
											objektHinzufügen = true;
											feldHinzugefügt = true;
										}
									}
								}
								if (feldExistiert && !feldHinzugefügt) {
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								//es gibt keine passende Beziehung, nicht hinzufügen
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
					}
				} else if (DsTyp_z === "Datensammlung") {
					dsExistiert = false;
					//das ist ein Feld aus einer Datensammlung
					for (var k=0; k<Objekt.Datensammlungen.length; k++) {
						if (Objekt.Datensammlungen[k].Name === DsName_z) {
							dsExistiert = true;
							if (Objekt.Datensammlungen[k].Name === DsName_z && typeof Objekt.Datensammlungen[k].Daten !== "undefined" && typeof Objekt.Datensammlungen[k].Daten[Feldname_z] !== "undefined") {
								if (typeof Objekt.Datensammlungen[k].Daten[Feldname_z] === "number" && typeof Filterwert_z === "number" && Objekt.Datensammlungen[k].Daten[Feldname_z] === parseInt(Filterwert_z, 10)) {
									objektHinzufügen = true;
								} else if (Objekt.Datensammlungen[k].Daten[Feldname_z].toString().toLowerCase().indexOf(Filterwert_z) >= 0) {
									objektHinzufügen = true;
								} else {
									objektNichtHinzufügen = true;
									break loop_filterkriterien;
								}
							} else {
								objektNichtHinzufügen = true;
								break loop_filterkriterien;
							}
						}
					}
					if (!dsExistiert) {
						//es gibt keine passende Beziehung, nicht hinzufügen
						objektNichtHinzufügen = true;
						break loop_filterkriterien;
					}
				}
			}

			if (filterkriterien.length === 0 && nur_ds) {
				//hoppla. jetzt müssen wir trotzdem durch die Felder loopen und schauen, ob der Datensatz anzuzeigende Felder enthält
				//wenn ja und Feld aus DS/BS: objektHinzufügen = true;
				//wenn nein, soll der Datensatz ja nicht exportiert werden
				for (var zz=0; zz<felder.length; zz++) {
					DsTyp_z = felder[zz].DsTyp;
					DsName_z = felder[zz].DsName;
					Feldname_z = felder[zz].Feldname;
					if (DsTyp_z === "Beziehung") {
						//durch alle Beziehungssammlungen loopen
						for (var gg=0; gg<Objekt.Beziehungssammlungen.length; gg++) {
							if (Objekt.Beziehungssammlungen[gg].Name === DsName_z) {
								//durch Beziehungssammlungen der Beziehung loopen
								if (Objekt.Beziehungssammlungen[gg].Beziehungen.length > 0) {
									for (var hh=0; hh<Objekt.Beziehungssammlungen[gg].Beziehungen.length; hh++) {
										//durch die Felder der Beziehung loopen
										if (Objekt.Beziehungssammlungen[gg].Beziehungen[hh][Feldname_z]) {
											//ja, so ein Feld kommt vor > Objekt exportieren
											objektHinzufügen = true;
										}
									}
								}
							}
						}
					} else if (DsTyp_z === "Datensammlung") {
						//das ist ein Feld aus einer Datensammlung
						for (var kk=0; kk<Objekt.Datensammlungen.length; kk++) {
							if (Objekt.Datensammlungen[kk].Name === DsName_z) {
								if (Objekt.Datensammlungen[kk].Name === DsName_z && typeof Objekt.Datensammlungen[kk].Daten !== "undefined" && typeof Objekt.Datensammlungen[kk].Daten[Feldname_z] !== "undefined") {
									//ja, so ein Feld kommt vor > Objekt exportieren
									objektHinzufügen = true;
								}
							}
						}
					}
				}
			}

			if (objektHinzufügen && objektNichtHinzufügen === false) {
				//alle Kriterien sind erfüllt
				//Neues Objekt aufbauen, das nur die gewünschten Felder enthält
				for (var e in Objekt) {
					//durch alle Eigenschaften des Dokuments loopen
					if (typeof Objekt[e] !== "object" && e !== "_rev") {
						for (i=0; i<felder.length; i++) {
							if (felder[i].DsName === "Objekt" && felder[i].Feldname === e) {
								exportObjekt[e] = Objekt[e];
							}
						}
					}
				}
				if (Objekt.Taxonomie && Objekt.Taxonomie.Daten) {
					for (var a in Objekt.Taxonomie.Daten) {
						for (var w in felder) {
							if (felder[w].DsTyp === "Taxonomie" && (fasseTaxonomienZusammen || felder[w].DsName === Objekt.Taxonomie.Name)) {
								if (felder[w].Feldname === a) {
									if (typeof exportObjekt.Taxonomie === "undefined") {
										exportObjekt.Taxonomie = {};
										exportObjekt.Taxonomie.Name = felder[w].DsName;
									}
									if (typeof exportObjekt.Taxonomie.Daten === "undefined") {
										exportObjekt.Taxonomie.Daten = {};
									}
									exportObjekt.Taxonomie.Daten[a] = Objekt.Taxonomie.Daten[a];
								}
							}
						}
					}
				}
				if (Objekt.Datensammlungen) {
					for (i=0; i<Objekt.Datensammlungen.length; i++) {
						if (Objekt.Datensammlungen[i].Daten) {
							for (var aa in Objekt.Datensammlungen[i].Daten) {
								for (var u=0; u<felder.length; u++) {
									if (felder[u].DsTyp === "Datensammlung" && felder[u].DsName === Objekt.Datensammlungen[i].Name) {
										if (felder[u].Feldname === aa) {
											if (typeof exportObjekt.Datensammlungen === "undefined") {
												Datensammlung = {};
												Datensammlung.Name = felder[u].DsName;
												Datensammlung.Daten = {};
												Datensammlung.Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
												exportObjekt.Datensammlungen = [];
												exportObjekt.Datensammlungen.push(Datensammlung);
											} else {
												dsExistiertSchon = false;
												//durch alle Datensammlungen loopen und die richtige suchen
												for (var b=0; b<exportObjekt.Datensammlungen.length; b++) {
													if (exportObjekt.Datensammlungen[b].Name === felder[u].DsName) {
														dsExistiertSchon = true;
														if (typeof exportObjekt.Datensammlungen[b] === "undefined") {
															exportObjekt.Datensammlungen[b].Daten = {};
														}
														exportObjekt.Datensammlungen[b].Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
													}
												}
												if (!dsExistiertSchon) {
													Datensammlung = {};
													Datensammlung.Name = felder[u].DsName;
													Datensammlung.Daten = {};
													Datensammlung.Daten[aa] = Objekt.Datensammlungen[i].Daten[aa];
													//exportObjekt.Datensammlungen = [];
													exportObjekt.Datensammlungen.push(Datensammlung);
												}

											}
										}
									}
								}
							}
						}
					}
				}
				if (Objekt.Beziehungssammlungen && Objekt.Beziehungssammlungen.length > 0) {
					for (i=0; i<Objekt.Beziehungssammlungen.length; i++) {
						//durch Beziehungssammlungen loopen
						for (var ww=0; ww<felder.length; ww++) {
							if (felder[ww].DsTyp === "Beziehung" && felder[ww].DsName === Objekt.Beziehungssammlungen[i].Name) {
								for (var aaa=0; aaa<Objekt.Beziehungssammlungen[i].Beziehungen.length; aaa++) {
									//durch Beziehungen loopen
									if (Objekt.Beziehungssammlungen[i].Beziehungen[aaa][felder[ww].Feldname]) {
										//in der Beziehung gibt es das gesuchte Feld
										if (!exportObjekt.Beziehungssammlungen) {
											//im Exportobjekt Beziehungssammlungen anlegen, falls noch nicht vorhanden
											exportObjekt.Beziehungssammlungen = [];
										}
										dsExistiertSchon = false;
										for (var t=0; t<exportObjekt.Beziehungssammlungen.length; t++) {
											//im Exportobjekt die Beziehungssammlung suchen
											if (exportObjekt.Beziehungssammlungen[t].Name === felder[ww].DsName) {
												dsExistiertSchon = true;
												if (!exportObjekt.Beziehungssammlungen[t].Beziehungen) {
													exportObjekt.Beziehungssammlungen[t].Beziehungen = [];
												}
												//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
												if (filterkriterien && filterkriterien.length > 0) {
													for (var l=0; l<filterkriterien.length; l++) {
														var DsTyp = filterkriterien[l].DsTyp;
														var DsName = filterkriterien[l].DsName;
														var Feldname = filterkriterien[l].Feldname;
														var Filterwert = filterkriterien[l].Filterwert;
														if (DsTyp === "Beziehung" && DsName === felder[ww].DsName && Feldname === felder[ww].Feldname) {
															if ((typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "number" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === parseInt(Filterwert, 10)) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname]).toLowerCase().indexOf(Filterwert) >= 0) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname] === "string" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname].toLowerCase().indexOf(Filterwert) >= 0)) {
																//Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wer die Bedingung erfüllt
																if (Feldname === "Beziehungspartner") {
																	var bezPartner = [];
																	var beziehung = Objekt.Beziehungssammlungen[i].Beziehungen[aaa];
																	for (var m=0; m<Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname].length; m++) {
																		if (JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname][m]).toLowerCase().indexOf(Filterwert) >= 0) {
																			bezPartner.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname][m]);
																		}
																	}
																	beziehung.Beziehungspartner = bezPartner;
																	exportObjekt.Beziehungssammlungen[t].Beziehungen.push(beziehung);
																} else {
																	exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
																}
															}
														}
													}
												} else {
													//kein Filter auf Feldern - Beziehung hinzufügen
													//aber sicherstellen, dass sie nicht schon drin ist
													if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], exportObjekt.Beziehungssammlungen[t].Beziehungen)) {
														exportObjekt.Beziehungssammlungen[t].Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
													}
												}
											}
										}
										if (!dsExistiertSchon) {
											Beziehungssammlung = {};
											Beziehungssammlung.Name = felder[ww].DsName;
											Beziehungssammlung.Beziehungen = [];
											if (filterkriterien && filterkriterien.length > 0) {
												//durch alle Beziehungen loopen und nur diejenigen anfügen, welche die Bedingungen erfüllen
												for (var ll=0; ll<filterkriterien.length; ll++) {
													Feldname2 = filterkriterien[ll].Feldname;
													Filterwert2 = filterkriterien[ll].Filterwert;
													if (filterkriterien[ll].DsTyp === "Beziehung" && filterkriterien[ll].DsName === felder[ww].DsName && Feldname2 === felder[ww].Feldname) {
														if ((typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "number" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === parseInt(Filterwert2, 10)) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "object" && JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2]).toLowerCase().indexOf(Filterwert2) >= 0) || (typeof Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2] === "string" && Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].toLowerCase().indexOf(Filterwert2) >= 0)) {
															//Wenn Feldname2 = Beziehungspartner, durch die Partner loopen und nur hinzufügen, wer die Bedingung erfüllt
															if (Feldname2 === "Beziehungspartner") {
																var bezPartner2 = [];
																var beziehung2 = Objekt.Beziehungssammlungen[i].Beziehungen[aaa];
																for (var mm=0; mm<Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2].length; mm++) {
																	if (JSON.stringify(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]).toLowerCase().indexOf(Filterwert2) >= 0) {
																		bezPartner2.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa][Feldname2][mm]);
																	}
																}
																beziehung2.Beziehungspartner = bezPartner2;
																Beziehungssammlung.Beziehungen.push(beziehung2);
															} else {
																Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
															}
														}
													}
												}
											} else {
												//kein Filter auf Feldern - alle hinzufügen
												if (!containsObject(Objekt.Beziehungssammlungen[i].Beziehungen[aaa], Beziehungssammlung.Beziehungen)) {
													Beziehungssammlung.Beziehungen.push(Objekt.Beziehungssammlungen[i].Beziehungen[aaa]);
												}
											}
											exportObjekt.Beziehungssammlungen.push(Beziehungssammlung);
										}
									}
								}
							}
						}
					}
				}
				//Objekt zu Exportobjekten hinzufügen
				exportObjekte.push(exportObjekt);
				//arrays für sammlungen aus synonymen zurücksetzen
				beziehungssammlungen_aus_synonymen = [];
				datensammlungen_aus_synonymen = [];
			}
		}
		send(JSON.stringify(exportObjekte));
	});
}

function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}