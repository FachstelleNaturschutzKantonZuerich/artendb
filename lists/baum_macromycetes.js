function (head, req) {
    'use strict';

    start({
        "headers": {
            "Accept-Charset": "utf-8",
            "Content-Type": "json; charset=utf-8;"
        }
    });

	var row,
        objekt,
        objekt_array = [],
        level = parseInt(req.query.group_level),
        filter,
        i;

	if (req.query.id) {
		level--;
	}

	while(row = getRow()) {
		objekt = {};
		objekt.data = row.key[level-1];
		objekt.attr = {};
		objekt.attr.level = level;
		objekt.attr.gruppe = "macromycetes";
		filter = [];
		for (i=0; i<level; i++) {
			filter.push(row.key[i]);
		}
		objekt.attr.filter = filter;
		if (req.query.id) {
			objekt.attr.id = row.key[2];
		}
		objekt.state = "closed";
		objekt_array.push(objekt);
	}

	send(JSON.stringify(objekt_array));
}