import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent {
  public activity = [
    {
      title: "Boxing",
      img: "assets/img/karate-2.jpg",
      alt: "Boxing",
    },
    {
      title: "Gym",
      img: "assets/img/gym.jpg",
      alt: "Gym",
    },
    {
      title: "Yoga",
      img: "assets/img/yoga.jpg",
      alt: "Yoga",
    },
    {
      title: "Dance",
      img: "assets/img/dance.jpg",
      alt: "Dance",
    },
    {
      title: "Drawing",
      img: "assets/img/drawing.jpg",
      alt: "Drawing",
    },
    {
      title: "Karate",
      img: "assets/img/karate.jpg",
      alt: "Karate",
    },
    {
      title: "Harmonium",
      img: "assets/img/harmonium.jpg",
      alt: "Harmonium",
    },
    {
      title: "Swimming",
      img: "assets/img/swimming.jpg",
      alt: "Swimming",
    },
  ];
}
