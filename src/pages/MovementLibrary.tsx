import { useMemo, useState } from 'react';
import {
  movementLibrary,
  type MovementCategory,
} from '../data/movementLibrary';
import './MovementLibrary.css';

interface MovementLibraryProps {
  onBack: () => void;
}

type CategoryFilter = 'All' | MovementCategory;

const categories: CategoryFilter[] = [
  'All',
  'Snatch',
  'Clean',
  'Jerk',
  'Other',
];

export default function MovementLibrary({
  onBack,
}: MovementLibraryProps) {
  const [searchText, setSearchText] =
    useState('');

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('All');

  const filteredMovements = useMemo(() => {
    const normalizedSearch =
      searchText.trim().toLocaleLowerCase();

    return movementLibrary.filter((movement) => {
      const categoryMatches =
        selectedCategory === 'All' ||
        movement.category === selectedCategory;

      const searchableText = [
        movement.name,
        movement.category,
        movement.source,
        movement.description ?? '',
        ...(movement.aliases ?? []),
      ]
        .join(' ')
        .toLocaleLowerCase();

      const searchMatches =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return categoryMatches && searchMatches;
    });
  }, [searchText, selectedCategory]);

  const openVideo = (videoUrl: string): void => {
    window.open(
      videoUrl,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <main className="movement-library-page">
      <header className="movement-library-header">
        <button
          type="button"
          className="movement-library-back"
          onClick={onBack}
          aria-label="Geri dön"
        >
          ←
        </button>

        <div>
          <span className="movement-library-brand">
            FORGE PERFORMANCE
          </span>
          <h1>HAREKET KÜTÜPHANESİ</h1>
        </div>
      </header>

      <section className="movement-library-intro">
        <span className="movement-library-count">
          {movementLibrary.length} HAREKET
        </span>
        <p>
          Olympic lifting hareketlerinin teknik videolarına ulaş.
        </p>
      </section>

      <section className="movement-library-search-section">
        <div className="movement-library-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Hareket ara..."
            aria-label="Hareket ara"
          />
          {searchText.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchText('')}
              aria-label="Aramayı temizle"
            >
              ×
            </button>
          )}
        </div>

        <div className="movement-library-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category === 'All'
                ? 'TÜMÜ'
                : category.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="movement-library-results">
        <div className="movement-library-results-header">
          <span>
            {selectedCategory === 'All'
              ? 'TÜM HAREKETLER'
              : selectedCategory.toUpperCase()}
          </span>
          <strong>{filteredMovements.length}</strong>
        </div>

        {filteredMovements.length > 0 ? (
          <div className="movement-library-grid">
            {filteredMovements.map((movement) => (
              <article
                key={movement.id}
                className="movement-library-card"
              >
                <div className="movement-library-card-top">
                  <div className="movement-library-icon">
                    ▶
                  </div>
                  <span className="movement-library-category">
                    {movement.category}
                  </span>
                </div>

                <div className="movement-library-card-content">
                  <h2>{movement.name}</h2>
                  {movement.description && (
                    <p>{movement.description}</p>
                  )}
                  {movement.aliases &&
                    movement.aliases.length > 0 && (
                      <span className="movement-library-alias">
                        Also known as:{' '}
                        {movement.aliases.join(', ')}
                      </span>
                    )}
                </div>

                <div className="movement-library-card-footer">
                  <div>
                    <span>SOURCE</span>
                    <strong>{movement.source}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openVideo(movement.videoUrl)
                    }
                  >
                    VİDEOYU AÇ
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="movement-library-empty">
            <strong>Hareket bulunamadı</strong>
            <p>
              Arama kelimesini veya kategori filtresini değiştir.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchText('');
                setSelectedCategory('All');
              }}
            >
              FİLTRELERİ TEMİZLE
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
