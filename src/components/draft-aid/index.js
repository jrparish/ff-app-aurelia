import { inject } from 'aurelia-framework';
import { RankingService } from 'services/ranking';

@inject(RankingService)
export class DraftAid {

  loading = true;

  constructor(rankingService) {
    this.rankingService = rankingService;
    this.loadRankings();
  }

  loadRankings(format, week = 0) {
    this.rankingService.get(format, week).then(result => {
      this.rankings = result.rankings;
      this.loading = false;
    });
  }

}
