import '../css/rightBar.css';
import StoreSVG from './svg/storeSVG';

function storeButtonHover(isOnHover: boolean) {
  document.querySelectorAll('.store-button-yellow').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`);
  });
  document.querySelectorAll('.store-button-red').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`);
  });
}

function RightBar({
  addNewMinion,
  allTilesHidden,
}: {
  addNewMinion: (type: "Squirrel" | "Badger" | "Hare" | "Deer" | "Koala" | "Bear") => void;
  allTilesHidden: boolean;
}) {
  return (
    <div className='right-bar'>

      {!allTilesHidden && (
        <button
          className='store-button'
          onClick={() => addNewMinion('Hare')}
          onMouseEnter={() => storeButtonHover(true)}
          onMouseLeave={() => storeButtonHover(false)}
        >
          <StoreSVG />
        </button>
      )}
    </div>
  );
}

export default RightBar;
