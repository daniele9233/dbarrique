
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

interface CollectionLoadingProps {
  title: string;
  subtitle: string;
  loadingText: string;
}

const CollectionLoading = ({ title, subtitle, loadingText }: CollectionLoadingProps) => {
  return (
    <section className="section relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3">{subtitle}</h4>
        <h2 className="font-serif text-4xl md:text-5xl mb-5">{title}</h2>
        <p className="text-white/70">
          {loadingText}
        </p>
      </div>
      <LoadingSpinner />
    </section>
  );
};

export default CollectionLoading;
