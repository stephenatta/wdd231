const byuiCourse = {
  code: "WDD 231",
  name: "Web Frontend Development I",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Asay" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 25, days: "MWF", instructor: "Tanner" },
  ],
  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      add ? section.enrolled++ : section.enrolled--;
    }
  }
};

export default byuiCourse;
