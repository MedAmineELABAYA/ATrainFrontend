export class Results {
  NoTrain: number;
  departure_station: string;
  arrival_station: string;
  departure_time: string;
  arrival_time: string;
  duration: number;
  comment: string;

  constructor(NoTrain: number, departure_station: string, arrival_station: string, departure_time: string, arrival_time: string, duration: number, comment: string) {
    this.NoTrain = NoTrain;
    this.departure_station = departure_station;
    this.arrival_station = arrival_station;
    this.departure_time = departure_time;
    this.arrival_time = arrival_time;
    this.duration = duration;
    this.comment = comment;
  }
}
