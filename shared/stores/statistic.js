import {Store} from 'flummox';
import {doAsync} from './api';


export class CompetitionsByType extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getCompetitionsByType);
    }
}

export class CompetitionsByYear extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getCompetitionsByYear);
    }
}

export class CompetitionsTop extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getCompetitionsTop);
    }
}

export class General extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getGeneral);
    }
}

export class Location extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getLocation);
    }
}

export class UsersBySex extends Store {
    constructor(flux) {
        super();
        doAsync(this, flux.getActionIds('statistic').getUsersBySex);
    }
}
