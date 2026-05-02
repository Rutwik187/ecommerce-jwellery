"use client"

import { useMemo, useState } from "react"
import {
  Search,
  Mail,
  Reply,
  Trash2,
  CheckCheck,
  Inbox,
  ArrowLeft,
} from "lucide-react"
import {
  messages as initialMessages,
  formatDateTime,
  relativeDay,
  type Message,
} from "@/components/admin/mock-data"

type Filter = "all" | "unread"

export default function AdminMessagesPage() {
  const [list, setList] = useState<Message[]>(initialMessages)
  const [filter, setFilter] = useState<Filter>("all")
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(initialMessages[0]?.id ?? null)
  const [replyText, setReplyText] = useState("")
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  const filtered = useMemo(() => {
    return list.filter((m) => {
      const matchFilter = filter === "all" || (filter === "unread" && !m.read)
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase())
      return matchFilter && matchSearch
    })
  }, [list, filter, search])

  const selected = list.find((m) => m.id === selectedId) ?? null
  const unreadCount = list.filter((m) => !m.read).length

  const markRead = (id: string) => {
    setList((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const markAllRead = () => {
    setList((prev) => prev.map((m) => ({ ...m, read: true })))
  }

  const deleteMessage = (id: string) => {
    setList((prev) => prev.filter((m) => m.id !== id))
    if (selectedId === id) {
      setSelectedId(null)
      setMobileDetailOpen(false)
    }
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    markRead(id)
    setMobileDetailOpen(true)
    setReplyText("")
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Reply sent", { to: selected?.email, body: replyText })
    setReplyText("")
  }

  return (
    <div className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-primary mb-2">
            Inbox
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            Contact Messages
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {unreadCount} unread &middot; {list.length} total
          </p>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-card text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground hover:border-primary glossy-transition w-fit disabled:opacity-40 disabled:hover:border-border"
        >
          <CheckCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
          Mark All Read
        </button>
      </div>

      {/* Master-detail layout */}
      <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="grid lg:grid-cols-[380px_1fr] min-h-[640px]">
          {/* List */}
          <div
            className={`border-b lg:border-b-0 lg:border-r border-border flex flex-col ${
              mobileDetailOpen ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Search and filter */}
            <div className="p-4 sm:p-5 border-b border-border space-y-3">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full bg-background border border-border rounded-full pl-11 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary glossy-transition"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "unread"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase glossy-transition ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                    {f === "unread" && unreadCount > 0 && (
                      <span className="ml-1.5">({unreadCount})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto max-h-[560px]">
              {filtered.length === 0 ? (
                <div className="p-10 text-center">
                  <Inbox className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">No messages found</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {filtered.map((msg) => {
                    const active = selectedId === msg.id
                    return (
                      <li key={msg.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(msg.id)}
                          className={`w-full text-left px-4 sm:px-5 py-4 hover:bg-secondary/40 glossy-transition ${
                            active ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm flex-shrink-0 ${
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-primary/15 text-primary"
                              }`}
                            >
                              {msg.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2 mb-0.5">
                                <p
                                  className={`text-sm truncate ${
                                    msg.read ? "text-foreground" : "text-foreground font-semibold"
                                  }`}
                                >
                                  {msg.name}
                                </p>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {!msg.read && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  )}
                                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                    {relativeDay(msg.date)}
                                  </span>
                                </div>
                              </div>
                              <p
                                className={`text-xs mb-0.5 truncate ${
                                  msg.read ? "text-foreground/80" : "text-foreground"
                                }`}
                              >
                                {msg.subject}
                              </p>
                              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Detail */}
          <div className={`flex flex-col ${mobileDetailOpen ? "flex" : "hidden lg:flex"}`}>
            {selected ? (
              <>
                {/* Mobile back */}
                <div className="lg:hidden px-4 py-3 border-b border-border">
                  <button
                    type="button"
                    onClick={() => setMobileDetailOpen(false)}
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground glossy-transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Inbox
                  </button>
                </div>

                {/* Header */}
                <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="font-serif text-xl sm:text-2xl text-foreground tracking-tight leading-tight">
                      {selected.subject}
                    </h2>
                    <button
                      type="button"
                      onClick={() => deleteMessage(selected.id)}
                      className="p-2 -mr-2 text-muted-foreground hover:text-destructive glossy-transition flex-shrink-0"
                      aria-label="Delete message"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm">
                        {selected.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">{selected.name}</p>
                        <p className="text-[11px] text-muted-foreground">{selected.email}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground sm:ml-auto">
                      {formatDateTime(selected.date)}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-5 sm:px-7 py-6 flex-1 overflow-y-auto">
                  <p className="text-sm sm:text-[15px] text-foreground/85 leading-relaxed whitespace-pre-line">
                    {selected.message}
                  </p>
                </div>

                {/* Reply form (the contact form within admin) */}
                <form
                  onSubmit={handleSendReply}
                  className="border-t border-border bg-secondary/40 p-4 sm:p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Reply className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground font-medium">
                      Reply to {selected.name.split(" ")[0]}
                    </span>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows={4}
                    className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none glossy-transition"
                  />
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 mt-3">
                    <p className="text-[11px] text-muted-foreground">
                      Sending to{" "}
                      <span className="text-foreground">{selected.email}</span>
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setReplyText("")}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase border border-border text-foreground hover:border-primary glossy-transition"
                      >
                        Discard
                      </button>
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground glossy-transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Reply className="w-3 h-3" strokeWidth={2} />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-foreground mb-1.5">No message selected</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Choose a conversation from the inbox to view and reply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
