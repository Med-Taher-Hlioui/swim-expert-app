export interface Drill {
  id: string;
  name: string;
  description: string;
  youtubeId: string;
}

export interface StrokeGroup {
  stroke: string;
  drills: Drill[];
}

export const SWIM_DATA: StrokeGroup[] = [
  {
    stroke: "Freestyle",
    drills: [
      { id: "fr1", name: "Fingertip Drag", description: "Focus on high elbow recovery by dragging fingers on the surface.", youtubeId: "vI1Z58y-5_w" },
      { id: "fr2", name: "Catch-Up Drill", description: "Wait for one hand to touch the other before starting the next stroke.", youtubeId: "vH_mCg-C0k0" },
      { id: "fr3", name: "Fist Swimming", description: "Swim with closed fists to feel the water with your forearms.", youtubeId: "Wp6HofPshF0" }
    ]
  },
  {
    stroke: "Backstroke",
    drills: [
      { id: "bk1", name: "Cup on Forehead", description: "Keep a steady head position by balancing a cup while swimming.", youtubeId: "jL_A7U66_iE" },
      { id: "bk2", name: "Single Arm Backstroke", description: "Isolate one arm to focus on rotation and pull strength.", youtubeId: "vH_mCg-C0k0" }
    ]
  },
  {
    stroke: "Breaststroke",
    drills: [
      { id: "br1", name: "2 Kicks, 1 Pull", description: "Emphasize the glide phase and kick power.", youtubeId: "Wp6HofPshF0" },
      { id: "br2", name: "Breaststroke with Fly Kick", description: "Improve timing between the pull and the undulation.", youtubeId: "vI1Z58y-5_w" }
    ]
  },
  {
    stroke: "Butterfly",
    drills: [
      { id: "fly1", name: "One Arm Butterfly", description: "Master the timing of the kick with the arm entry.", youtubeId: "vH_mCg-C0k0" },
      { id: "fly2", name: "Biondi Drill", description: "Focus on the chest press and the second kick of the cycle.", youtubeId: "jL_A7U66_iE" }
    ]
  }
];