import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
interface Extension {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  isActive: boolean;
}
const initialExtensions: Extension[] = [{
  id: "1",
  name: "DevLens",
  description: "Quickly inspect page layouts and visualize element boundaries.",
  icon: "🔍",
  iconBg: "bg-green-200",
  isActive: true
}, {
  id: "2",
  name: "StyleSpy",
  description: "Instantly analyze and copy CSS from any webpage element.",
  icon: "👁️",
  iconBg: "bg-blue-200",
  isActive: true
}, {
  id: "3",
  name: "SpeedBoost",
  description: "Optimizes browser resource usage to accelerate page loading.",
  icon: "⚡",
  iconBg: "bg-pink-200",
  isActive: false
}, {
  id: "4",
  name: "JSONWizard",
  description: "Formats, validates, and prettifies JSON responses in-browser.",
  icon: "🧙",
  iconBg: "bg-purple-200",
  isActive: true
}, {
  id: "5",
  name: "TabMaster Pro",
  description: "Organizes browser tabs into groups and sessions.",
  icon: "📋",
  iconBg: "bg-indigo-200",
  isActive: true
}, {
  id: "6",
  name: "ViewportBuddy",
  description: "Simulates various screen resolutions directly within the browser.",
  icon: "📱",
  iconBg: "bg-blue-300",
  isActive: false
}, {
  id: "7",
  name: "Markup Notes",
  description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
  icon: "📝",
  iconBg: "bg-cyan-200",
  isActive: true
}, {
  id: "8",
  name: "GridGuides",
  description: "Overlay customizable grids and alignment guides on any webpage.",
  icon: "⚏",
  iconBg: "bg-purple-300",
  isActive: false
}, {
  id: "9",
  name: "Palette Picker",
  description: "Instantly extracts color palettes from any webpage.",
  icon: "🎨",
  iconBg: "bg-emerald-200",
  isActive: true
}, {
  id: "10",
  name: "LinkChecker",
  description: "Scans and highlights broken links on any page.",
  icon: "🔗",
  iconBg: "bg-orange-200",
  isActive: true
}, {
  id: "11",
  name: "DOM Snapshot",
  description: "Capture and export DOM structures quickly.",
  icon: "📸",
  iconBg: "bg-cyan-300",
  isActive: false
}, {
  id: "12",
  name: "ConsolePlus",
  description: "Enhanced developer console with advanced filtering and logging.",
  icon: "⌨️",
  iconBg: "bg-green-300",
  isActive: true
}];
const Index = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [extensions, setExtensions] = useState<Extension[]>(initialExtensions);
  const [extensionStates, setExtensionStates] = useState<Record<string, boolean>>(initialExtensions.reduce((acc, ext) => ({
    ...acc,
    [ext.id]: ext.isActive
  }), {}));
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleExtension = (id: string) => {
    setExtensionStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const removeExtension = (id: string) => {
    setExtensions(prev => prev.filter(ext => ext.id !== id));
    setExtensionStates(prev => {
      const newState = {
        ...prev
      };
      delete newState[id];
      return newState;
    });
  };
  const filteredExtensions = extensions.filter(ext => {
    if (activeFilter === "active") return extensionStates[ext.id];
    if (activeFilter === "inactive") return !extensionStates[ext.id];
    return true;
  });
  const themeClasses = isDarkMode ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white" : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900";
  const cardClasses = isDarkMode ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50" : "bg-white/80 border-gray-200 hover:bg-white/90";
  return <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
            </div>
            <h1 className="text-2xl font-bold">Extensions Manager</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className={`rounded-xl border-2 transition-all duration-300 ${isDarkMode ? "border-slate-600 hover:border-slate-500 bg-slate-700/50" : "border-gray-300 hover:border-gray-400 bg-white/50"}`}>
            {isDarkMode ? "🌙" : "☀️"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title and Filters */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Extensions List</h2>
            <div className="flex gap-2">
              {["all", "active", "inactive"].map(filter => <Button key={filter} variant={activeFilter === filter ? "default" : "outline"} onClick={() => setActiveFilter(filter as typeof activeFilter)} className={`capitalize rounded-full px-6 transition-all duration-300 ${activeFilter === filter ? "bg-red-500 hover:bg-red-600 text-white border-red-500" : isDarkMode ? "border-slate-600 hover:border-slate-500 bg-slate-700/30 hover:bg-slate-600/50" : "border-gray-300 hover:border-gray-400 bg-white/30 hover:bg-white/50"}`}>
                  {filter}
                </Button>)}
            </div>
          </div>

          {/* Extensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtensions.map(extension => <div key={extension.id} className={`${cardClasses} border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${extension.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-xl`}>
                    {extension.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{extension.name}</h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                      {extension.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                  <Button variant="outline" size="sm" onClick={() => removeExtension(extension.id)} className={`rounded-lg transition-all duration-300 ${isDarkMode ? "border-slate-600 hover:border-slate-500 bg-slate-700/30 hover:bg-slate-600/50" : "border-gray-300 hover:border-gray-400 bg-white/30 hover:bg-white/50"}`}>
                    Remove
                  </Button>
                  <Switch checked={extensionStates[extension.id]} onCheckedChange={() => toggleExtension(extension.id)} className="data-[state=checked]:bg-red-500" />
                </div>
              </div>)}
          </div>

          {filteredExtensions.length === 0 && <div className="text-center py-12">
              <p className={`text-lg ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                No {activeFilter} extensions found.
              </p>
            </div>}
        </div>
      </div>
    </div>;
};
export default Index;