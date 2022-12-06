



export function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }


export async function showPath(path: number[], visited: boolean = false) {
    for (let i = 0; i < path.length; i++) {
      await delay(10);
      document.getElementById(`${path[i]}`)!.style.background = visited
        ? "var(--sand)"
        : "radial-gradient(circle at 7px 7px,var(--yellow), #EEE)";
      await delay(10);
      if (i + 1 !== path.length) {
        if (
          document.getElementById(
            `${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
          ) ||
          document.getElementById(
            `${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
          )
        ) {
          if (path[i] < path[i + 1])
            document.getElementById(
              `${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
            )!.style.background = visited
              ? "var(--sand)"
              : "radial-gradient(circle at 7px 7px,var(--yellow), #EEE)";
          else
            document.getElementById(
              `${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
            )!.style.background = visited
              ? "var(--sand)"
              : "radial-gradient(circle at 7px 7px,var(--yellow), #EEE)";
        }
      }
    }
  }
