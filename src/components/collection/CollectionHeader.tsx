
interface CollectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const CollectionHeader = ({ title, subtitle, description }: CollectionHeaderProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3 opacity-0 animate-fade-in">{subtitle}</h4>
      <h2 className="font-serif text-4xl md:text-5xl mb-5 opacity-0 animate-fade-in animate-delay-100">{title}</h2>
      <p className="text-white/70 opacity-0 animate-fade-in animate-delay-200">
        {description}
      </p>
    </div>
  );
};

export default CollectionHeader;
