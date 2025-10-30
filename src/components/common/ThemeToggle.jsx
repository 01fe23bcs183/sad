import { useAppContext } from '../../context/AppContext.jsx';

const themes = [
  { id: 'nebula', label: 'Nebula', gradient: 'from-primary to-accent' },
  { id: 'aurora', label: 'Aurora', gradient: 'from-emerald-400 to-cyan-500' }
];

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-surface-light/80 px-3 py-2 backdrop-blur">
        {themes.map((item) => (
          <button
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ${theme === item.id ? 'bg-white/10 text-white shadow-glow' : 'text-white/60 hover:text-white'}`}
          >
            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.gradient}`} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
