import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Boxes, Building2, ChevronLeft, ChevronRight, CircleDollarSign, ClipboardList,
  FileDown, Home, LogOut, Menu, Moon, Package, Pencil, Plus, Search, ShieldCheck,
  Sun, Trash2, UserCog, X,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { createManagedUser } from "@/lib/admin-users.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type View = "dashboard" | "suppliers" | "items" | "orders" | "users";
type Supplier = { id: string; company_name: string; cnpj: string | null; contact_name: string | null; email: string | null; phone: string | null };
type Item = { id: string; name: string; description: string | null; unit: string; default_price: number; supplier_id: string | null };
type Order = { id: string; order_number: string; status: "rascunho" | "aprovado" | "entregue"; total: number; created_at: string; supplier_id: string | null; notes: string | null };
type Profile = { id: string; full_name: string; email: string };

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const labels: Record<View, string> = { dashboard: "Painel Geral", suppliers: "Fornecedores", items: "Itens / Produtos", orders: "Ordens de Compra", users: "Usuários" };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error("E-mail ou senha inválidos."); else toast.success("Bem-vindo ao sistema.");
  }
  return <main className="login-shell min-h-screen p-5">
    <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl items-stretch overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
      <div className="brand-panel hidden w-[54%] flex-col justify-between p-12 lg:flex">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-sidebar-foreground/60">Gestão de compras</div>
        <div><p className="max-w-md text-4xl font-extrabold leading-tight text-sidebar-foreground">Controle, agilidade e clareza em cada compra.</p><p className="mt-4 max-w-md text-sm leading-6 text-sidebar-foreground/70">Ambiente exclusivo para a equipe GOLD CONTABILIDADE.</p></div>
        <p className="text-xs text-sidebar-foreground/50">Acesso corporativo protegido</p>
      </div>
      <div className="flex flex-1 items-center justify-center p-7 sm:p-12">
        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
          <div className="text-center"><img src="/logo.png" alt="Logo da GOLD CONTABILIDADE" className="mx-auto h-32 w-auto max-w-full object-contain" /><h1 className="mt-7 text-xl font-extrabold text-primary">Acesso ao sistema</h1><p className="mt-1 text-sm text-muted-foreground">Entre com suas credenciais corporativas</p></div>
          <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@empresa.com.br" required /></div>
          <div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" required /></div>
          <Button className="h-11 w-full font-bold" disabled={loading}>{loading ? "Entrando..." : "Entrar no sistema"}</Button>
          <p className="text-center text-xs text-muted-foreground"></p>
        </form>
      </div>
    </section>
  </main>;
}

export function ProcurementApp() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(null);
  const [ready, setReady] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<{ url: string; filename: string } | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [dark, setDark] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  useEffect(() => { setCurrentPage(1); }, [view, query]);
  const [dialog, setDialog] = useState<null | "supplier" | "item" | "order" | "user">(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const createUser = useServerFn(createManagedUser);

  async function loadData() {
    const user = (await supabase.auth.getUser()).data.user;
    const [s, i, o, p, r] = await Promise.all([
      supabase.from("suppliers").select("id,company_name,cnpj,contact_name,email,phone").order("company_name"),
      supabase.from("items").select("id,name,description,unit,default_price,supplier_id").order("name"),
      supabase.from("purchase_orders").select("id,order_number,status,total,created_at,supplier_id,notes").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id,full_name,email").order("full_name"),
      supabase.from("user_roles").select("role").eq("user_id", user?.id ?? "").eq("role", "admin").maybeSingle(),
    ]);
    const isMasterAdmin = user?.email === "lpas.lucas@gmail.com";
    if (s.data) setSuppliers(s.data); if (i.data) setItems(i.data); if (o.data) setOrders(o.data); if (p.data) setProfiles(p.data); setIsAdmin(isMasterAdmin || Boolean(r.data));
  }
  useEffect(() => { supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); if (data.session) loadData(); }); const { data } = supabase.auth.onAuthStateChange((_e, next) => { setSession(next); if (next) loadData(); }); return () => data.subscription.unsubscribe(); }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  if (!ready) return <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Carregando...</div>;
  if (!session) return <Login />;

  const supplierName = (id: string | null) => suppliers.find((s) => s.id === id)?.company_name ?? "Sem fornecedor";
  const filtered = (values: { toString(): string }[]) => values.some((v) => v.toString().toLowerCase().includes(query.toLowerCase()));
  const nav = [{ id: "dashboard", icon: Home }, { id: "orders", icon: ClipboardList }, { id: "suppliers", icon: Building2 }, { id: "items", icon: Package }, ...(isAdmin ? [{ id: "users", icon: UserCog }] : [])] as { id: View; icon: typeof Home }[];
  const open = (kind: typeof dialog, id: string | null = null) => { setEditingId(id); setDialog(kind); };

  async function remove(table: "suppliers" | "items" | "purchase_orders", id: string) {
    if (!confirm("Deseja realmente excluir este registro?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Registro excluído."); loadData(); }
  }

  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu /></Button><img src="/logo.png" alt="GOLD CONTABILIDADE" className="h-12 w-auto object-contain" /></div>
      <div className="flex items-center gap-2"><Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Alternar tema">{dark ? <Sun /> : <Moon />}</Button><div className="hidden text-right sm:block"><p className="text-xs font-semibold">{session.user.email}</p><p className="text-[10px] uppercase text-muted-foreground">{isAdmin ? "Administrador" : "Comprador"}</p></div><Button variant="ghost" size="icon" onClick={() => supabase.auth.signOut()} aria-label="Sair"><LogOut /></Button></div>
    </header>
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar p-4 text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between lg:hidden"><b>Menu</b><Button variant="ghost" size="icon" onClick={() => setMobileNav(false)}><X /></Button></div>
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/45">Operações</p>
        <nav className="space-y-1">{nav.map(({ id, icon: Icon }) => <Button key={id} variant={view === id ? "sidebarActive" : "sidebar"} className="w-full justify-start" onClick={() => { setView(id); setMobileNav(false); setQuery(""); }}><Icon />{labels[id]}</Button>)}</nav>
        <div className="mt-8 border-t border-sidebar-border pt-5"><div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-4"><p className="text-xs text-sidebar-foreground/60">Total em ordens</p><p className="mt-1 font-mono text-lg font-bold text-brand-gold">{money.format(orders.reduce((a, o) => a + Number(o.total), 0))}</p></div></div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-7xl animate-page-in">
        {view === "dashboard" && <Dashboard orders={orders} suppliers={suppliers} items={items} onOpen={() => { setView("orders"); open("order"); }} />}
        {view !== "dashboard" && <><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">GOLD CONTABILIDADE</p><h1 className="mt-1 text-2xl font-extrabold">{labels[view]}</h1></div><Button variant="gold" onClick={() => open(view === "suppliers" ? "supplier" : view === "items" ? "item" : view === "orders" ? "order" : "user")}><Plus />Novo registro</Button></div><div className="mb-4 flex max-w-sm items-center gap-2"><div className="relative w-full"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Buscar..." value={query} onChange={(e) => setQuery(e.target.value)} /></div></div></>}
        {view === "suppliers" && (() => { const list = suppliers.filter(s => filtered([s.company_name, s.cnpj ?? "", s.contact_name ?? ""])); const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); return <div className="space-y-4"><DataTable headers={["Empresa", "CNPJ", "Contato", "E-mail", "Telefone", ""]}>{paginated.map(s => <tr key={s.id}><Cell strong>{s.company_name}</Cell><Cell>{s.cnpj || "—"}</Cell><Cell>{s.contact_name || "—"}</Cell><Cell>{s.email || "—"}</Cell><Cell>{s.phone || "—"}</Cell><Actions onEdit={() => open("supplier", s.id)} onDelete={() => remove("suppliers", s.id)} /></tr>)}</DataTable><PaginationFooter total={list.length} current={currentPage} perPage={ITEMS_PER_PAGE} onChange={setCurrentPage} /></div> })()}
        {view === "items" && (() => { const list = items.filter(i => filtered([i.name, i.description ?? ""])); const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); return <div className="space-y-4"><DataTable headers={["Item", "Descrição", "Unidade", "Preço padrão", "Fornecedor", ""]}>{paginated.map(i => <tr key={i.id}><Cell strong>{i.name}</Cell><Cell>{i.description || "—"}</Cell><Cell>{i.unit}</Cell><Cell mono>{money.format(i.default_price)}</Cell><Cell>{supplierName(i.supplier_id)}</Cell><Actions onEdit={() => open("item", i.id)} onDelete={() => remove("items", i.id)} /></tr>)}</DataTable><PaginationFooter total={list.length} current={currentPage} perPage={ITEMS_PER_PAGE} onChange={setCurrentPage} /></div> })()}
        {view === "orders" && (() => { const list = orders.filter(o => filtered([o.order_number, o.status])); const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); return <div className="space-y-4"><DataTable headers={["Nº OS", "Data", "Valor total", "Status", ""]}>{paginated.map(o => <tr key={o.id}><Cell strong mono>{o.order_number}</Cell><Cell>{new Date(o.created_at).toLocaleDateString("pt-BR")}</Cell><Cell mono>{money.format(o.total)}</Cell><Cell><Status value={o.status} /></Cell><td className="px-5 py-3 text-right"><Button variant="ghost" size="icon" onClick={async () => { const doc = await exportPdf(o, items, suppliers); setPdfPreview({ url: doc.output("bloburl").toString(), filename: `${o.order_number}.pdf` }); }} aria-label="Pré-visualizar PDF"><FileDown /></Button><Button variant="ghost" size="icon" onClick={() => open("order", o.id)} aria-label="Editar"><Pencil /></Button><Button variant="ghost" size="icon" onClick={() => remove("purchase_orders", o.id)} aria-label="Excluir"><Trash2 /></Button></td></tr>)}</DataTable><PaginationFooter total={list.length} current={currentPage} perPage={ITEMS_PER_PAGE} onChange={setCurrentPage} /></div> })()}
        {view === "users" && (isAdmin ? (() => { const list = profiles.filter(p => filtered([p.full_name, p.email])); const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); return <div className="space-y-4"><DataTable headers={["Nome", "E-mail", "Acesso"]}>{paginated.map(p => <tr key={p.id}><Cell strong>{p.full_name || "Usuário"}</Cell><Cell>{p.email}</Cell><Cell><span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground"><ShieldCheck className="size-3" />Usuário interno</span></Cell></tr>)}</DataTable><PaginationFooter total={list.length} current={currentPage} perPage={ITEMS_PER_PAGE} onChange={setCurrentPage} /></div> })() : <div className="border border-destructive/30 bg-destructive/5 p-8 text-center"><ShieldCheck className="mx-auto mb-3 size-8 text-destructive" /><h2 className="font-bold">Acesso negado</h2></div>)}
      </div></main>
    </div>
    <RecordDialog kind={dialog} setKind={setDialog} editingId={editingId} suppliers={suppliers} items={items} orders={orders} onSaved={loadData} createUser={createUser} />
    <Dialog open={Boolean(pdfPreview)} onOpenChange={(o) => !o && setPdfPreview(null)}><DialogContent className="max-w-4xl h-[85vh] flex flex-col"><DialogHeader><DialogTitle>Pré-visualização do PDF</DialogTitle></DialogHeader><div className="flex-1 min-h-0 bg-muted/30 rounded-md border border-border">{pdfPreview && <iframe src={pdfPreview.url} className="w-full h-full rounded-md" />}</div><DialogFooter><Button variant="outline" onClick={() => setPdfPreview(null)}>Fechar</Button>{pdfPreview && <Button asChild><a href={pdfPreview.url} download={pdfPreview.filename}>Fazer Download</a></Button>}</DialogFooter></DialogContent></Dialog>
  </div>;
}

function Dashboard({ orders, suppliers, items, onOpen }: { orders: Order[]; suppliers: Supplier[]; items: Item[]; onOpen: () => void }) {
  const delivered = orders.filter((o) => o.status === "entregue").length;
  return <><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Visão operacional</p><h1 className="mt-1 text-2xl font-extrabold">Painel de Compras</h1><p className="text-sm text-muted-foreground">Acompanhe solicitações e suprimentos da empresa.</p></div><Button variant="gold" onClick={onOpen}><Plus />Nova ordem (OS)</Button></div>
    <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Ordens abertas" value={String(orders.length - delivered).padStart(2, "0")} icon={ClipboardList} /><Metric label="Fornecedores" value={String(suppliers.length).padStart(2, "0")} icon={Building2} /><Metric label="Itens cadastrados" value={String(items.length).padStart(2, "0")} icon={Boxes} /><Metric label="Valor total" value={money.format(orders.reduce((a, o) => a + Number(o.total), 0))} icon={CircleDollarSign} /></section>
    <div className="overflow-hidden rounded border border-border bg-card shadow-sm"><div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-4"><h2 className="text-sm font-bold uppercase">Ordens recentes</h2><span className="text-xs text-muted-foreground">{orders.length} registros</span></div><DataTable plain headers={["Nº OS", "Data", "Total", "Status"]}>{orders.slice(0, 6).map(o => <tr key={o.id}><Cell strong mono>{o.order_number}</Cell><Cell>{new Date(o.created_at).toLocaleDateString("pt-BR")}</Cell><Cell mono>{money.format(o.total)}</Cell><Cell><Status value={o.status} /></Cell></tr>)}</DataTable></div>
  </>;
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Home }) { return <div className="rounded border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase text-muted-foreground">{label}</p><Icon className="size-4 text-primary" /></div><p className="mt-2 font-mono text-2xl font-bold text-primary">{value}</p></div>; }
function PaginationFooter({ total, current, perPage, onChange }: { total: number; current: number; perPage: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, total);
  return <div className="flex flex-wrap items-center justify-between gap-4 px-1 py-1"><p className="text-xs text-muted-foreground">Mostrando <span className="font-medium text-foreground">{start}</span> a <span className="font-medium text-foreground">{end}</span> de <span className="font-medium text-foreground">{total}</span> resultados</p><div className="flex items-center space-x-2"><Button variant="outline" size="sm" onClick={() => onChange(current - 1)} disabled={current === 1}><ChevronLeft className="mr-1 size-4" />Anterior</Button><div className="text-xs font-medium text-muted-foreground px-2">Página {current} de {pages}</div><Button variant="outline" size="sm" onClick={() => onChange(current + 1)} disabled={current === pages}>Próximo<ChevronRight className="ml-1 size-4" /></Button></div></div>;
}

function DataTable({ headers, children, plain = false }: { headers: string[]; children: React.ReactNode; plain?: boolean }) { return <div className={plain ? "overflow-x-auto" : "overflow-x-auto rounded border border-border bg-card shadow-sm"}><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-border bg-muted/50">{headers.map(h => <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{h}</th>)}</tr></thead><tbody className="divide-y divide-border">{children}</tbody></table></div>; }
function Cell({ children, strong = false, mono = false }: { children: React.ReactNode; strong?: boolean; mono?: boolean }) { return <td className={`px-5 py-3 text-sm ${strong ? "font-semibold text-foreground" : "text-muted-foreground"} ${mono ? "font-mono" : ""}`}>{children}</td>; }
function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) { return <td className="px-5 py-2 text-right"><Button variant="ghost" size="icon" onClick={onEdit} aria-label="Editar"><Pencil /></Button><Button variant="ghost" size="icon" onClick={onDelete} aria-label="Excluir"><Trash2 /></Button></td>; }
function Status({ value }: { value: Order["status"] }) { return <span className={`status-${value} inline-flex rounded px-2 py-1 text-[10px] font-bold uppercase`}>{value}</span>; }

function RecordDialog({ kind, setKind, editingId, suppliers, items, orders, onSaved, createUser }: { kind: null | "supplier" | "item" | "order" | "user"; setKind: (v: null) => void; editingId: string | null; suppliers: Supplier[]; items: Item[]; orders: Order[]; onSaved: () => void; createUser: (data: { data: { fullName: string; email: string; password: string; role: "admin" | "comprador" } }) => Promise<unknown> }) {
  const editingSupplier = suppliers.find(s => s.id === editingId); const editingItem = items.find(i => i.id === editingId); const editingOrder = orders.find(o => o.id === editingId);
  const [lines, setLines] = useState<{ itemId: string; name: string; quantity: number; price: number }[]>([]);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  useEffect(() => { if (kind === "order") { setItemSearch(""); setSelectedItemId(""); if (editingId) { supabase.from("purchase_order_items").select("*").eq("purchase_order_id", editingId).then(({ data }) => { if (data && data.length) setLines(data.map(oi => ({ itemId: oi.item_id || "", name: oi.item_name, quantity: oi.quantity, price: oi.unit_price }))); else setLines([]); }); } else setLines([]); } }, [kind, editingId]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const fd = new FormData(e.currentTarget); let error: Error | null = null;
    try {
      if (kind === "supplier") { const payload = { company_name: String(fd.get("company_name")), cnpj: String(fd.get("cnpj") || "") || null, contact_name: String(fd.get("contact_name") || "") || null, email: String(fd.get("email") || "") || null, phone: String(fd.get("phone") || "") || null }; const r = editingId ? await supabase.from("suppliers").update(payload).eq("id", editingId) : await supabase.from("suppliers").insert(payload); if (r.error) throw r.error; }
      if (kind === "item") { const payload = { name: String(fd.get("name")), description: String(fd.get("description") || "") || null, unit: String(fd.get("unit")), default_price: Number(fd.get("price")), supplier_id: String(fd.get("supplier") || "") || null }; const r = editingId ? await supabase.from("items").update(payload).eq("id", editingId) : await supabase.from("items").insert(payload); if (r.error) throw r.error; }
      if (kind === "order") { const valid = lines.filter(l => l.itemId && l.quantity > 0); const total = valid.reduce((a, l) => a + (l.quantity * l.price), 0); const payload = { total, supplier_id: null, status: String(fd.get("status")) as Order["status"], notes: String(fd.get("notes") || "") || null }; if (editingId) { const r = await supabase.from("purchase_orders").update(payload).eq("id", editingId); if (r.error) throw r.error; if (!editingOrder || editingOrder.status === "rascunho") { await supabase.from("purchase_order_items").delete().eq("purchase_order_id", editingId); if (valid.length) { const ir = await supabase.from("purchase_order_items").insert(valid.map(l => ({ purchase_order_id: editingId, item_id: l.itemId, item_name: l.name, quantity: l.quantity, unit_price: l.price }))); if (ir.error) throw ir.error; } } } else { const { data: o, error: r } = await supabase.from("purchase_orders").insert(payload).select("id").single(); if (r || !o) throw r ?? new Error("Ordem não criada"); if (valid.length) { const ir = await supabase.from("purchase_order_items").insert(valid.map(l => ({ purchase_order_id: o.id, item_id: l.itemId, item_name: l.name, quantity: l.quantity, unit_price: l.price }))); if (ir.error) throw ir.error; } } }
      if (kind === "user") await createUser({ data: { fullName: String(fd.get("full_name")), email: String(fd.get("email")), password: String(fd.get("password")), role: String(fd.get("role")) as "admin" | "comprador" } });
    } catch (e) { error = e instanceof Error ? e : new Error("Não foi possível salvar."); }
    if (error) toast.error(error.message); else { toast.success("Salvo com sucesso."); setKind(null); onSaved(); }
  }
  const title = kind === "supplier" ? "Fornecedor" : kind === "item" ? "Item / Produto" : kind === "order" ? "Ordem de Compra" : "Usuário";
  return <Dialog open={Boolean(kind)} onOpenChange={(o) => !o && setKind(null)}><DialogContent className={kind === "order" ? "max-h-[90vh] max-w-4xl overflow-y-auto" : "max-w-xl"}><DialogHeader><DialogTitle>{editingId ? "Editar" : "Novo"} {title}</DialogTitle><DialogDescription>Preencha os campos e confirme para salvar.</DialogDescription></DialogHeader><form onSubmit={submit} className="space-y-4">
    {kind === "supplier" && <div className="grid gap-4 sm:grid-cols-2"><Field label="Nome da empresa *" name="company_name" required defaultValue={editingSupplier?.company_name ?? ""} /><Field label="CNPJ" name="cnpj" defaultValue={editingSupplier?.cnpj ?? ""} /><Field label="Contato" name="contact_name" defaultValue={editingSupplier?.contact_name ?? ""} /><Field label="E-mail" name="email" type="email" defaultValue={editingSupplier?.email ?? ""} /><Field label="Telefone" name="phone" defaultValue={editingSupplier?.phone ?? ""} /></div>}
    {kind === "item" && <div className="grid gap-4 sm:grid-cols-2"><Field label="Nome do item *" name="name" required defaultValue={editingItem?.name} /><Field label="Unidade *" name="unit" required defaultValue={editingItem?.unit ?? "Un"} /><Field label="Preço padrão *" name="price" type="number" step="0.01" required defaultValue={editingItem?.default_price} /><NativeSelect label="Fornecedor" name="supplier" defaultValue={editingItem?.supplier_id ?? ""} options={suppliers.map(s => ({ value: s.id, label: s.company_name }))} /><div className="sm:col-span-2"><Label>Descrição</Label><Textarea name="description" defaultValue={editingItem?.description ?? ""} /></div></div>}
    {kind === "order" && <><div className="grid gap-4 sm:grid-cols-2"><NativeSelect label="Status" name="status" defaultValue={editingOrder?.status ?? "rascunho"} options={[{ value: "rascunho", label: "Rascunho" }, { value: "aprovado", label: "Aprovado" }, { value: "entregue", label: "Entregue" }]} /><div><Label>Data</Label><Input value={new Date(editingOrder?.created_at || Date.now()).toLocaleDateString("pt-BR")} disabled /></div></div><div className="border border-border"><div className="flex items-center justify-between bg-muted/50 px-4 py-3"><b className="text-sm">Itens da OS</b></div>{(!editingOrder || editingOrder.status === "rascunho") && <div className="border-b border-border bg-muted/20 p-4"><div className="relative space-y-1.5"><Label>Buscar e inserir item</Label><div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Digite o nome do item para adicionar..." value={itemSearch} onChange={e => setItemSearch(e.target.value)} autoComplete="off" /></div>{itemSearch.length > 0 && <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover shadow-md">{items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())).map(it => <button key={it.id} type="button" className="flex w-full items-center border-b border-border px-4 py-2 text-sm last:border-0 hover:bg-accent hover:text-accent-foreground" onClick={() => { setLines([...lines, { itemId: it.id, name: it.name, quantity: 1, price: Number(it.default_price ?? 0) }]); setItemSearch(""); }}><div className="flex flex-col text-left"><span className="font-bold">{it.name}</span><span className="text-[10px] text-muted-foreground">Preço padrão: {money.format(it.default_price)}</span></div></button>)}{items.filter(i => i.name.toLowerCase().includes(itemSearch.toLowerCase())).length === 0 && <div className="px-4 py-3 text-sm text-muted-foreground">Nenhum item encontrado.</div>}</div>}</div></div>}<div className="space-y-3 p-4">{lines.map((l, idx) => <div key={idx} className="grid items-end gap-3 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_auto]"><div><Label>Item</Label><Input value={l.name || "Não encontrado"} disabled /></div><div><Label>Fornecedor</Label><Input value={items.find(i => i.id === l.itemId)?.supplier_id ? suppliers.find(s => s.id === items.find(i => i.id === l.itemId)?.supplier_id)?.company_name ?? "" : ""} disabled /></div><Field label="Qtd." name={`q-${idx}`} type="number" step="0.001" disabled={Boolean(editingOrder && editingOrder.status !== "rascunho")} value={l.quantity} onChange={v => setLines(lines.map((x, n) => n === idx ? { ...x, quantity: Number(v) } : x))} /><Field label="Preço unit." name={`p-${idx}`} type="number" step="0.01" disabled={Boolean(editingOrder && editingOrder.status !== "rascunho")} value={l.price} onChange={v => setLines(lines.map((x, n) => n === idx ? { ...x, price: Number(v) } : x))} /><div><Label>Subtotal</Label><div className="flex h-9 items-center rounded border border-border bg-muted px-3 font-mono text-sm">{money.format(l.quantity * l.price)}</div></div>{(!editingOrder || editingOrder.status === "rascunho") && <Button type="button" variant="ghost" size="icon" onClick={() => setLines(lines.filter((_, n) => n !== idx))}><Trash2 /></Button>}</div>)}{lines.length === 0 && <div className="py-4 text-center text-sm text-muted-foreground">Nenhum item inserido.</div>}</div><div className="border-t border-border bg-primary/5 px-4 py-3 text-right font-bold text-primary">Valor total: {money.format(lines.reduce((a, l) => a + l.quantity * l.price, 0))}</div></div><div><Label>Observações</Label><Textarea name="notes" defaultValue={editingOrder?.notes ?? ""} /></div></>}
    {kind === "user" && <div className="grid gap-4 sm:grid-cols-2"><Field label="Nome completo *" name="full_name" required /><Field label="E-mail *" name="email" type="email" required /><Field label="Senha temporária *" name="password" type="password" minLength={8} required /><NativeSelect label="Nível de acesso" name="role" defaultValue="comprador" options={[{ value: "comprador", label: "Comprador" }, { value: "admin", label: "Administrador" }]} /></div>}
    <DialogFooter><Button type="button" variant="outline" onClick={() => setKind(null)}>Cancelar</Button><Button type="submit">Salvar</Button></DialogFooter>
  </form></DialogContent></Dialog>;
}

function Field({ label, name, value, onChange, ...props }: { label: string; name: string; value?: string | number; onChange?: (v: string) => void } & Omit<React.ComponentProps<typeof Input>, "name" | "value" | "onChange">) { return <div className="space-y-1.5"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...(value !== undefined ? { value, onChange: (e) => onChange?.(e.target.value) } : {})} {...props} /></div> }
function NativeSelect({ label, name, options, defaultValue, value, onChange, disabled }: { label: string; name: string; options: { value: string; label: string }[]; defaultValue?: string; value?: string; onChange?: (v: string) => void; disabled?: boolean }) { return <div className="space-y-1.5"><Label htmlFor={name}>{label}</Label><select id={name} name={name} disabled={disabled} className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50" defaultValue={value === undefined ? defaultValue : undefined} value={value} onChange={e => onChange?.(e.target.value)}><option value="">Selecione</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div> }

async function exportPdf(order: Order, items: Item[], suppliers: Supplier[]) { const { data: orderItems } = await supabase.from("purchase_order_items").select("*").eq("purchase_order_id", order.id); const { jsPDF } = await import("jspdf"); const { default: autoTable } = await import("jspdf-autotable"); const doc = new jsPDF(); doc.setFontSize(18); doc.setTextColor(0, 51, 160); doc.text("GOLD CONTABILIDADE", 14, 18); doc.setFontSize(9); doc.setTextColor(80); doc.text("Assessoria contábil e serviços", 14, 24); doc.setFontSize(14); doc.setTextColor(20); doc.text(`Ordem de Compra ${order.order_number}`, 14, 38); autoTable(doc, { startY: 46, head: [["Data", "Status", "Valor total"]], body: [[new Date(order.created_at).toLocaleDateString("pt-BR"), order.status.toUpperCase(), money.format(order.total)]], theme: "grid", headStyles: { fillColor: [0, 51, 160] } }); if (orderItems && orderItems.length) { autoTable(doc, { startY: (doc as any).lastAutoTable.finalY + 10, head: [["Item", "Fornecedor", "Qtd.", "Preço", "Subtotal"]], body: orderItems.map(oi => { const it = items.find(i => i.id === oi.item_id); const sup = it?.supplier_id ? suppliers.find(s => s.id === it.supplier_id)?.company_name : ""; return [oi.item_name, sup || "N/A", oi.quantity.toString(), money.format(oi.unit_price), money.format(oi.quantity * oi.unit_price)] }), theme: "grid" }) } doc.setFontSize(9); doc.text("Documento emitido pelo Sistema de Gestão de Compras — GOLD CONTABILIDADE", 14, 282); return doc; }