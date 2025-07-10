



type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person &
{
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: "American" | "British" | "Australian" | "Israeli - American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const result : unknown = await response.json();

    if (!response.ok) {
      throw new Error("Problemi con il server");
    }

    if (!isActress(result)) {
      throw new Error("errore");
    }
    console.log(result);
    return result


  } catch (errore) {
    if (errore instanceof Error) {
      console.error(errore.message);
    } else {
      console.error('Erorre sconosciuto', errore);
    }
    return null;
  }
}


function isActress(result: unknown): result is Actress {
  if (
      result &&
      typeof result === "object" &&
      "id" in result &&
      typeof result.id === "number" &&
      "name" in result &&
      typeof result.name === "string" &&
      "birth_year" in result &&
      typeof result.birth_year === "number" &&
      (!("death_year" in result) || typeof (result as any).death_year === "number") &&
      "biography" in result &&
      typeof result.biography === "string" &&
      "image" in result &&
      typeof result.image === "string" &&
      "most_famous_movies" in result &&
      Array.isArray(result.most_famous_movies) &&
      "awards" in result &&
      typeof result.awards === "string" &&
      "nationality" in result &&
      typeof result.nationality === "string"
    ) 
    {
    return true;
    }

  return false;
}


// async function getAllActesses(): Promise< object[] | null>{
//   try {
//     const response = await fetch(`http://localhost:3333/actresses`);
//     const result: unknown = await response.json();

//     if (!response.ok) {
//       throw new Error("Problemi con il server");
//     }

//     // if (!isActress(result)) {
//     //   throw new Error("errore");
//     // }
//     console.log(result);
//     return result


//   } catch (errore) {
//     if (errore instanceof Error) {
//       console.error(errore.message);
//     } else {
//       console.error('Erorre sconosciuto', errore);
//     }
//     return null;
//   }
// }

// getAllActesses();



(async () => {

  const ids = [1,2,3,4,5];
  const promises: Promise<Actress | null >[] = [];

  ids.forEach((id) => {
    const res:Promise<Actress | null> = getActress(id)
    promises.push(res)
  })

  const allResult: unknown = await Promise.all(promises);
  console.log("Risultati: ", allResult);

})();
