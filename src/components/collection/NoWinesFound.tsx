
interface NoWinesFoundProps {
  resetAllFilters: () => void;
}

const NoWinesFound = ({ resetAllFilters }: NoWinesFoundProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-white/60 text-lg mb-4">Nessun vino trovato che corrisponda ai tuoi criteri.</p>
      <button
        onClick={resetAllFilters}
        className="text-wine hover:text-wine-light transition-colors duration-300"
      >
        Azzera tutti i filtri
      </button>
    </div>
  );
};

export default NoWinesFound;
