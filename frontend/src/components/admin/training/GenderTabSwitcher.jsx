const GenderTabSwitcher = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex justify-center gap-3 mb-5">
      <button
        className={`px-3  md:px-6 py-2 bg-none ${
          selectedTab === "male"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
        onClick={() => setSelectedTab("male")}
      >
        Male
      </button>
      <button
        className={`px-3  md:px-6 py-2 bg-none ${
          selectedTab === "female"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
        onClick={() => setSelectedTab("female")}
      >
        Female
      </button>
      <button
        className={`px-3  md:px-6 py-2 bg-none ${
          selectedTab === "conditioning"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
        onClick={() => setSelectedTab("conditioning")}
      >
        Conditioning
      </button>
    </div>
  );
};

export default GenderTabSwitcher;
