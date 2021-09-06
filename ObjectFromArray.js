const worldCupChampions = [
  { date: "12/07/1930", items: [{ country: "Uruguay" }] },
  { date: "03/09/1978", items: [{ country: "Argentina" }] },
  { date: "20/04/1950", items: [{ country: "Inglaterra" }] },
  { date: "06/12/2010", items: [{ country: "España" }] },
];

worldCupChampions
  .map((item) => item)
  .sort((a, b) => {
    var aa = a.date.split("/").reverse().join(),
      bb = b.date.split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  })
  .reduce(
    (acc, i) => ({
      ...acc,
      [i.date.slice(3)]: i,
    }),
    {}
  );
