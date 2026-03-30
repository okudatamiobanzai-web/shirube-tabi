"use client";

import { useState, useRef } from "react";
import TopPage from "@/components/TopPage";
import ListPage from "@/components/ListPage";
import DetailPage from "@/components/DetailPage";
import BuilderPage from "@/components/BuilderPage";
import MyListDrawer from "@/components/MyListDrawer";
import MyListBadge from "@/components/MyListBadge";
import ScrollToTop from "@/components/ScrollToTop";
import { useMyList } from "@/lib/mylist-context";
import type { AnyItem } from "@/lib/types";

export default function Home() {
  const [page, setPage] = useState("top");
  const [layerId, setLayerId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<AnyItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { myList, toggle, setBaseCourse } = useMyList();

  const navigate = (p: string, lid?: string) => {
    setPage(p);
    if (lid) setLayerId(lid);
    setSelectedItem(null);
    scrollRef.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const selectItem = (item: AnyItem) => {
    setSelectedItem(item);
    setPage("detail");
    scrollRef.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto pb-16">
        {page === "top" && (
          <TopPage onNavigate={navigate} onSelectItem={selectItem} />
        )}
        {page === "list" && layerId && (
          <ListPage
            layerId={layerId}
            onBack={() => navigate("top")}
            onSelectItem={selectItem}
          />
        )}
        {page === "detail" && selectedItem && (
          <DetailPage
            item={selectedItem}
            onBack={() => (layerId ? navigate("list", layerId) : navigate("top"))}
            liked={myList.includes(selectedItem.id)}
            onToggle={() => toggle(selectedItem.id)}
          />
        )}
        {page === "builder" && (
          <BuilderPage
            onBack={() => { setBaseCourse(null); navigate("top"); }}
          />
        )}
      </div>

      {page !== "builder" && (
        <>
          <ScrollToTop scrollRef={scrollRef} />
          <MyListBadge onClick={() => setDrawerOpen(true)} />
        </>
      )}

      <MyListDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onBuild={() => { setDrawerOpen(false); navigate("builder"); }}
        onSelectItem={selectItem}
      />
    </>
  );
}
