import { useMemo, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useSavedAccounts } from "@/hooks/useSavedAccounts";
import { useToast } from "@/hooks/useToast";
import { useCollections } from "@/hooks/useCollections";
import { ToastContainer } from "@/components/Toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { AccountCard } from "@/components/AccountCard";
import {
  BookmarkX,
  ArrowLeft,
  Bookmark,
  Lock,
  FolderOpen,
  Folder,
  Plus,
  Trash2,
  X,
  Crosshair,
  Swords,
  Flame,
  Gamepad2,
  Trophy,
  Sparkles,
  Layers,
  Tag,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import { useAuth, SignInButton, SignUpButton } from "@/lib/clerk";
import { DEFAULT_ACCOUNTS } from "@/data/accounts";

const ITEMS_PER_PAGE = 12;

type TabMode = "all" | string; // "all" or a collection id

const AVAILABLE_COLLECTION_ICONS = [
  { id: "folder", label: "Folder", Icon: Folder },
  { id: "crosshair", label: "Shooters", Icon: Crosshair },
  { id: "swords", label: "RPG / Action", Icon: Swords },
  { id: "flame", label: "Popular", Icon: Flame },
  { id: "gamepad", label: "Games", Icon: Gamepad2 },
  { id: "trophy", label: "Top Rated", Icon: Trophy },
  { id: "sparkles", label: "Special", Icon: Sparkles },
  { id: "layers", label: "Bundle", Icon: Layers },
  { id: "star", label: "Favorites", Icon: Star },
  { id: "shield", label: "Vault", Icon: Shield },
  { id: "zap", label: "Fast Access", Icon: Zap },
  { id: "tag", label: "Tag", Icon: Tag },
];

function CollectionIcon({
  name,
  className = "w-3.5 h-3.5",
}: {
  name: string;
  className?: string;
}) {
  const match = AVAILABLE_COLLECTION_ICONS.find((i) => i.id === name);
  const IconComponent = match ? match.Icon : Folder;
  return <IconComponent className={className} />;
}

export default function SavedAccounts() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { saved, toggleSave } = useSavedAccounts();
  const { toasts, addToast, removeToast } = useToast();
  const {
    collections,
    createCollection,
    deleteCollection,
    toggleAccountInCollection,
    isInCollection,
  } = useCollections();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabMode>("all");

  // New collection creation state
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newColName, setNewColName] = useState("");
  const [newColIcon, setNewColIcon] = useState("folder");

  const handleCreateCollection = () => {
    if (!newColName.trim()) return;
    createCollection(newColName.trim(), newColIcon);
    setNewColName("");
    setNewColIcon("folder");
    setShowNewCollection(false);
    addToast("Collection created!", "success");
  };

  // Get accounts for the current tab
  const tabAccounts = useMemo(() => {
    if (activeTab === "all") return saved;
    const col = collections.find((c) => c.id === activeTab);
    if (!col) return [];
    return DEFAULT_ACCOUNTS.filter((a) => col.accountIds.includes(a.id));
  }, [activeTab, saved, collections]);

  const filteredSaved = useMemo(() => {
    let result = [...(tabAccounts || [])];

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (account) =>
          (account.gameName || "").toLowerCase().includes(s) ||
          (account.platform || "").toLowerCase().includes(s) ||
          (account.username || "").toLowerCase().includes(s)
      );
    }

    if (platform && platform !== "All") {
      result = result.filter((account) => account.platform === platform);
    }

    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "alphabetical":
        result.sort((a, b) => (a.gameName || "").localeCompare(b.gameName || ""));
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [tabAccounts, debouncedSearch, platform, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, platform, sortBy, activeTab]);

  const totalPages = Math.ceil(filteredSaved.length / ITEMS_PER_PAGE) || 1;
  const paginatedSaved = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSaved.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSaved, currentPage]);

  const handleCopy = (_text: string, label: string) => {
    if (label) addToast(label, "success");
  };

  const activeCollection = collections.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen">
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-xs mb-5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center text-[#C1272D]">
                <Bookmark className="w-5 h-5" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("saved_title_1")} <span className="text-gradient">{t("saved_title_2")}</span>
              </h1>
            </div>

            <p className="text-white/40 text-xs mt-1">
              {saved.length} {t("saved_count")}
            </p>
          </motion.div>

          {/* Not signed in notice */}
          {!isSignedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C1272D]/20 text-[#C1272D] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Create an account to unlock full access</h4>
                  <p className="text-xs text-white/50">
                    Sign in to save posts, sync your favorite accounts across devices, and copy login credentials.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <SignInButton className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10" />
                <SignUpButton className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#C1272D] hover:bg-[#C1272D]/90" />
              </div>
            </motion.div>
          )}

          {/* ====== COLLECTIONS TABS ====== */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {/* All Saved tab */}
              <button
                onClick={() => setActiveTab("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  activeTab === "all"
                    ? "bg-[#C1272D] text-white border-[#C1272D] shadow-lg shadow-[#C1272D]/20"
                    : "text-white/60 border-white/10 hover:text-white hover:bg-white/5"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                All Saved
                <span className="ml-0.5 text-[10px] opacity-70">({saved.length})</span>
              </button>

              {/* Collection tabs */}
              {collections.map((col) => (
                <div key={col.id} className="relative group/col">
                  <button
                    onClick={() => setActiveTab(col.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                      activeTab === col.id
                        ? "bg-[#C1272D] text-white border-[#C1272D] shadow-lg shadow-[#C1272D]/20"
                        : "text-white/60 border-white/10 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <CollectionIcon name={col.icon} className="w-3.5 h-3.5 text-white/80" />
                    <span>{col.name}</span>
                    <span className="ml-0.5 text-[10px] opacity-70">({col.accountIds.length})</span>
                  </button>

                  {/* Delete collection button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCollection(col.id);
                      if (activeTab === col.id) setActiveTab("all");
                    }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C1272D] text-white items-center justify-center opacity-0 group-hover/col:opacity-100 transition-opacity hidden group-hover/col:flex shadow-sm"
                    title="Delete collection"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}

              {/* New collection button */}
              <button
                onClick={() => setShowNewCollection(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                New Collection
              </button>
            </div>

            {/* New Collection Form */}
            <AnimatePresence>
              {showNewCollection && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-2xl glass-panel border border-white/10 overflow-hidden bg-[#080d16]/95"
                >
                  <p className="text-xs font-semibold text-white/60 mb-3">Choose an Icon & Name</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {AVAILABLE_COLLECTION_ICONS.map(({ id, label, Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setNewColIcon(id)}
                        title={label}
                        className={`h-9 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
                          newColIcon === id
                            ? "bg-[#C1272D]/25 border border-[#C1272D] text-white"
                            : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={newColName}
                      onChange={(e) => setNewColName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                      placeholder="e.g. Action RPGs, Racing..."
                      autoFocus
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#C1272D]/50"
                    />
                    <button
                      onClick={handleCreateCollection}
                      disabled={!newColName.trim()}
                      className="px-4 py-2 rounded-xl bg-[#C1272D] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#C1272D]/90 transition-all shadow-md"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setShowNewCollection(false)}
                      className="px-3 py-2 rounded-xl border border-white/10 text-white/50 text-xs hover:text-white hover:bg-white/5 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collection header when on a collection tab */}
            {activeCollection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C1272D]/15 border border-[#C1272D]/30 flex items-center justify-center text-[#C1272D]">
                    <CollectionIcon name={activeCollection.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{activeCollection.name}</p>
                    <p className="text-[11px] text-white/40">{activeCollection.accountIds.length} accounts</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteCollection(activeCollection.id);
                    setActiveTab("all");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] text-white/40 border border-white/10 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Filters */}
          {tabAccounts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <SearchFilters
                search={search}
                onSearchChange={setSearch}
                platform={platform}
                onPlatformChange={setPlatform}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.div>
          )}

          {tabAccounts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 text-xs text-white/40">
                <div>
                  <span className="text-white/70 font-semibold">{filteredSaved.length}</span>{" "}
                  {t("vault_results")}
                </div>
              </div>

              {filteredSaved.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 stagger-fade-in">
                    {paginatedSaved.map((account, index) => (
                      <div key={account.id} className="relative group/saved">
                        <AccountCard
                          account={account}
                          isSaved={activeTab === "all" ? true : saved.some((s) => s.id === account.id)}
                          onToggleSave={toggleSave}
                          onCopy={handleCopy}
                          index={index}
                        />

                        {/* Add to collection overlay — visible on hover */}
                        {collections.length > 0 && (
                          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover/saved:opacity-100 transition-all duration-200 pointer-events-auto z-20">
                            <div className="flex gap-1 flex-wrap">
                              {collections.map((col) => (
                                <button
                                  key={col.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAccountInCollection(col.id, account.id);
                                  }}
                                  title={
                                    isInCollection(col.id, account.id)
                                      ? `Remove from ${col.name}`
                                      : `Add to ${col.name}`
                                  }
                                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium backdrop-blur-md border transition-all shadow-md ${
                                    isInCollection(col.id, account.id)
                                      ? "bg-[#C1272D]/30 border-[#C1272D]/60 text-white"
                                      : "bg-black/80 border-white/15 text-white/70 hover:text-white hover:border-white/30"
                                  }`}
                                >
                                  <CollectionIcon name={col.icon} className="w-3 h-3" />
                                  <span className="hidden sm:inline">{col.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-8">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${
                            currentPage === i + 1
                              ? "bg-[#C1272D] text-white shadow-md shadow-[#C1272D]/30 border border-[#C1272D]"
                              : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 glass-panel rounded-3xl border border-white/[0.06] p-8">
                  <BookmarkX className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-white/50 mb-1">No matching saved accounts</h3>
                  <p className="text-white/30 text-xs mb-4">Try clearing filters or search query</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setPlatform("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#C1272D]/15 text-[#C1272D] text-xs font-medium border border-[#C1272D]/30"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-panel rounded-3xl border border-white/[0.06] p-8"
            >
              {activeTab === "all" ? (
                <>
                  <BookmarkX className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white/50 mb-2">{t("saved_empty_title")}</h2>
                  <p className="text-white/30 text-xs mb-6 max-w-sm mx-auto">{t("saved_empty_desc")}</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1272D] text-white text-xs font-semibold shadow-lg shadow-[#C1272D]/20 hover:bg-[#C1272D]/90 transition-all"
                  >
                    {t("saved_browse")}
                  </Link>
                </>
              ) : (
                <>
                  <FolderOpen className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white/50 mb-2">Collection is empty</h2>
                  <p className="text-white/30 text-xs mb-6 max-w-sm mx-auto">
                    Go to your saved accounts and hover a card to add it to this collection.
                  </p>
                  <button
                    onClick={() => setActiveTab("all")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1272D] text-white text-xs font-semibold shadow-lg shadow-[#C1272D]/20 hover:bg-[#C1272D]/90 transition-all"
                  >
                    View All Saved
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
