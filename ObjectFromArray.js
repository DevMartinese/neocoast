/*
 Dado un arreglo de objetos, los cuales son de la forma { date: Date, items: Array<Object> } 
 retornar un objeto donde la key esel mes/año (ejemplo: 02/2020) y el valor es un arreglo con los elementos 
 cuya fecha sea la de esemes/año ordenados de forma ascendente.
*/
const worldCupChampions = [
  {
    date: "12/07/1930",
    items: [{ country: "Uruguay", champion: "Uruguay", runnerUp: "Argentina" }],
  },
  {
    date: "03/09/1978",
    items: [
      { country: "Argentina", champion: "Argentina", runnerUp: "Holanda" },
    ],
  },
  {
    date: "20/04/1966",
    items: [
      { country: "Inglaterra", champion: "Inglaterra", runnerUp: "Alemania" },
    ],
  },
  {
    date: "06/12/1998",
    items: [{ country: "Francia", champion: "Francia", runnerUp: "Brasil" }],
  },
];

const newOrder = worldCupChampions
  .map((item) => item)
  .sort((a, b) => {
    var aa = a.date.split("/").reverse(),
      bb = b.date.split("/").reverse();
    return bb < aa ? -1 : bb > aa ? 1 : 0;
  })
  .reduce(
    (acc, i) => ({
      ...acc,
      [i.date.slice(3)]: i,
    }),
    {}
  );

console.log(newOrder);