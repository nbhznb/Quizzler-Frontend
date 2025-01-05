import React from 'react';

export const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Books" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 14, name: "Television" },
  { id: 15, name: "Video Games" },
  { id: 16, name: "Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Computers" },
  { id: 19, name: "Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Comics" },
  { id: 30, name: "Gadgets" },
  { id: 31, name: "Anime & Manga" },
  { id: 32, name: "Cartoon & Animations" }
];

const CategorySelection = ({ setCategory, layout = "dropdown" }) => {
  if (layout === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[calc(100vh-12rem)]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className="btn btn-primary text-powder normal-case h-auto min-h-[3rem] p-2 hover:scale-105 transition-transform text-sm"
          >
            {cat.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
      {categories.map((cat) => (
        <li key={cat.id}>
          <button
            className="btn bg-powder text-primary hover:bg-primary hover:text-powder normal-case w-full justify-start py-2 h-auto min-h-0 text-sm"
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </div>
  );
};

export default CategorySelection;
