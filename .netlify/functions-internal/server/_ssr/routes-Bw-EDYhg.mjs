import { o as __toESM } from "../_runtime.mjs";
import { E as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CU4ogs9G.mjs";
import { t as supabase } from "./client-Ba0RGcKX.mjs";
import { _ as ChevronRight, a as ShieldCheck, b as Boxes, c as Pencil, d as Menu, f as LogOut, g as CircleDollarSign, h as ClipboardList, i as Sun, l as Package, m as FileDown, n as UserCog, o as Search, p as House, r as Trash2, s as Plus, t as X, u as Moon, v as ChevronLeft, y as Building2 } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bw-EDYhg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createUserSchema = objectType({
	fullName: stringType().trim().min(2),
	email: stringType().email(),
	password: stringType().min(8),
	role: enumType(["admin", "comprador"])
});
var createManagedUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => createUserSchema.parse(data)).handler(createSsrRpc("49198f9569992241160390da04915e137a25b16c5e203c54d233c906622e510e"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			gold: "bg-brand-gold text-brand-gold-foreground shadow-sm hover:bg-brand-gold-muted font-bold",
			sidebar: "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-none",
			sidebarActive: "border-l-4 border-brand-gold bg-sidebar-accent text-sidebar-accent-foreground shadow-none"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var money = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
});
var labels = {
	dashboard: "Painel Geral",
	suppliers: "Fornecedores",
	items: "Itens / Produtos",
	orders: "Ordens de Compra",
	users: "Usuários"
};
function Login() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) toast.error("E-mail ou senha inválidos.");
		else toast.success("Bem-vindo ao sistema.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-shell min-h-screen p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl items-stretch overflow-hidden rounded-lg border border-border bg-card shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "brand-panel hidden w-[54%] flex-col justify-between p-12 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold uppercase tracking-[0.2em] text-sidebar-foreground/60",
						children: "Gestão de compras"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-4xl font-extrabold leading-tight text-sidebar-foreground",
						children: "Controle, agilidade e clareza em cada compra."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-6 text-sidebar-foreground/70",
						children: "Ambiente exclusivo para a equipe GOLD CONTABILIDADE."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-sidebar-foreground/50",
						children: "Acesso corporativo protegido"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center p-7 sm:p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "w-full max-w-sm space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/logo.png",
									alt: "Logo da GOLD CONTABILIDADE",
									className: "mx-auto h-32 w-auto max-w-full object-contain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-7 text-xl font-extrabold text-primary",
									children: "Acesso ao sistema"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Entre com suas credenciais corporativas"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "nome@empresa.com.br",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Senha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Sua senha",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-11 w-full font-bold",
							disabled: loading,
							children: loading ? "Entrando..." : "Entrar no sistema"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-center text-xs text-muted-foreground" })
					]
				})
			})]
		})
	});
}
function ProcurementApp() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [pdfPreview, setPdfPreview] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)("dashboard");
	const [mobileNav, setMobileNav] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	const [suppliers, setSuppliers] = (0, import_react.useState)([]);
	const [items, setItems] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const ITEMS_PER_PAGE = 10;
	(0, import_react.useEffect)(() => {
		setCurrentPage(1);
	}, [view, query]);
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const createUser = useServerFn(createManagedUser);
	async function loadData() {
		const [s, i, o, p, r] = await Promise.all([
			supabase.from("suppliers").select("id,company_name,cnpj,contact_name,email,phone").order("company_name"),
			supabase.from("items").select("id,name,description,unit,default_price,supplier_id").order("name"),
			supabase.from("purchase_orders").select("id,order_number,status,total,created_at,supplier_id,notes").order("created_at", { ascending: false }),
			supabase.from("profiles").select("id,full_name,email").order("full_name"),
			supabase.from("user_roles").select("role").eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "").eq("role", "admin").maybeSingle()
		]);
		if (s.data) setSuppliers(s.data);
		if (i.data) setItems(i.data);
		if (o.data) setOrders(o.data);
		if (p.data) setProfiles(p.data);
		setIsAdmin(Boolean(r.data));
	}
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setReady(true);
			if (data.session) loadData();
		});
		const { data } = supabase.auth.onAuthStateChange((_e, next) => {
			setSession(next);
			if (next) loadData();
		});
		return () => data.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background text-sm text-muted-foreground",
		children: "Carregando..."
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Login, {});
	const supplierName = (id) => suppliers.find((s) => s.id === id)?.company_name ?? "Sem fornecedor";
	const filtered = (values) => values.some((v) => v.toString().toLowerCase().includes(query.toLowerCase()));
	const nav = [
		{
			id: "dashboard",
			icon: House
		},
		{
			id: "orders",
			icon: ClipboardList
		},
		{
			id: "suppliers",
			icon: Building2
		},
		{
			id: "items",
			icon: Package
		},
		...isAdmin ? [{
			id: "users",
			icon: UserCog
		}] : []
	];
	const open = (kind, id = null) => {
		setEditingId(id);
		setDialog(kind);
	};
	async function remove(table, id) {
		if (!confirm("Deseja realmente excluir este registro?")) return;
		const { error } = await supabase.from(table).delete().eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Registro excluído.");
			loadData();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						onClick: () => setMobileNav(true),
						"aria-label": "Abrir menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "GOLD CONTABILIDADE",
						className: "h-12 w-auto object-contain"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => setDark(!dark),
							"aria-label": "Alternar tema",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-right sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								children: session.user.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase text-muted-foreground",
								children: isAdmin ? "Administrador" : "Comprador"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => supabase.auth.signOut(),
							"aria-label": "Sair",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[calc(100vh-4rem)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `fixed inset-y-0 left-0 z-40 w-64 bg-sidebar p-4 text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center justify-between lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setMobileNav(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/45",
							children: "Operações"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-1",
							children: nav.map(({ id, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: view === id ? "sidebarActive" : "sidebar",
								className: "w-full justify-start",
								onClick: () => {
									setView(id);
									setMobileNav(false);
									setQuery("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), labels[id]]
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 border-t border-sidebar-border pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-sidebar-border bg-sidebar-accent/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-sidebar-foreground/60",
									children: "Total em ordens"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-lg font-bold text-brand-gold",
									children: money.format(orders.reduce((a, o) => a + Number(o.total), 0))
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl animate-page-in",
						children: [
							view === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {
								orders,
								suppliers,
								items,
								onOpen: () => {
									setView("orders");
									open("order");
								}
							}),
							view !== "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex flex-wrap items-end justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-[0.15em] text-primary",
									children: "GOLD CONTABILIDADE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-1 text-2xl font-extrabold",
									children: labels[view]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "gold",
									onClick: () => open(view === "suppliers" ? "supplier" : view === "items" ? "item" : view === "orders" ? "order" : "user"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo registro"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 flex max-w-sm items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "pl-9",
										placeholder: "Buscar...",
										value: query,
										onChange: (e) => setQuery(e.target.value)
									})]
								})
							})] }),
							view === "suppliers" && (() => {
								const list = suppliers.filter((s) => filtered([
									s.company_name,
									s.cnpj ?? "",
									s.contact_name ?? ""
								]));
								const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
										headers: [
											"Empresa",
											"CNPJ",
											"Contato",
											"E-mail",
											"Telefone",
											""
										],
										children: paginated.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												strong: true,
												children: s.company_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: s.cnpj || "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: s.contact_name || "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: s.email || "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: s.phone || "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
												onEdit: () => open("supplier", s.id),
												onDelete: () => remove("suppliers", s.id)
											})
										] }, s.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationFooter, {
										total: list.length,
										current: currentPage,
										perPage: ITEMS_PER_PAGE,
										onChange: setCurrentPage
									})]
								});
							})(),
							view === "items" && (() => {
								const list = items.filter((i) => filtered([i.name, i.description ?? ""]));
								const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
										headers: [
											"Item",
											"Descrição",
											"Unidade",
											"Preço padrão",
											"Fornecedor",
											""
										],
										children: paginated.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												strong: true,
												children: i.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: i.description || "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: i.unit }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												mono: true,
												children: money.format(i.default_price)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: supplierName(i.supplier_id) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
												onEdit: () => open("item", i.id),
												onDelete: () => remove("items", i.id)
											})
										] }, i.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationFooter, {
										total: list.length,
										current: currentPage,
										perPage: ITEMS_PER_PAGE,
										onChange: setCurrentPage
									})]
								});
							})(),
							view === "orders" && (() => {
								const list = orders.filter((o) => filtered([o.order_number, o.status]));
								const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
										headers: [
											"Nº OS",
											"Data",
											"Valor total",
											"Status",
											""
										],
										children: paginated.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												strong: true,
												mono: true,
												children: o.order_number
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: new Date(o.created_at).toLocaleDateString("pt-BR") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												mono: true,
												children: money.format(o.total)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, { value: o.status }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-5 py-3 text-right",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														onClick: async () => {
															const doc = await exportPdf(o, items, suppliers);
															setPdfPreview({
																url: doc.output("bloburl").toString(),
																filename: `${o.order_number}.pdf`
															});
														},
														"aria-label": "Pré-visualizar PDF",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														onClick: () => open("order", o.id),
														"aria-label": "Editar",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														onClick: () => remove("purchase_orders", o.id),
														"aria-label": "Excluir",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
													})
												]
											})
										] }, o.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationFooter, {
										total: list.length,
										current: currentPage,
										perPage: ITEMS_PER_PAGE,
										onChange: setCurrentPage
									})]
								});
							})(),
							view === "users" && (isAdmin ? (() => {
								const list = profiles.filter((p) => filtered([p.full_name, p.email]));
								const paginated = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
										headers: [
											"Nome",
											"E-mail",
											"Acesso"
										],
										children: paginated.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												strong: true,
												children: p.full_name || "Usuário"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: p.email }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), "Usuário interno"]
											}) })
										] }, p.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationFooter, {
										total: list.length,
										current: currentPage,
										perPage: ITEMS_PER_PAGE,
										onChange: setCurrentPage
									})]
								});
							})() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-destructive/30 bg-destructive/5 p-8 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto mb-3 size-8 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold",
									children: "Acesso negado"
								})]
							}))
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
				kind: dialog,
				setKind: setDialog,
				editingId,
				suppliers,
				items,
				orders,
				onSaved: loadData,
				createUser
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(pdfPreview),
				onOpenChange: (o) => !o && setPdfPreview(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-4xl h-[85vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Pré-visualização do PDF" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 min-h-0 bg-muted/30 rounded-md border border-border",
							children: pdfPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: pdfPreview.url,
								className: "w-full h-full rounded-md"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setPdfPreview(null),
							children: "Fechar"
						}), pdfPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: pdfPreview.url,
								download: pdfPreview.filename,
								children: "Fazer Download"
							})
						})] })
					]
				})
			})
		]
	});
}
function Dashboard({ orders, suppliers, items, onOpen }) {
	const delivered = orders.filter((o) => o.status === "entregue").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-[0.15em] text-primary",
					children: "Visão operacional"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-extrabold",
					children: "Painel de Compras"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Acompanhe solicitações e suprimentos da empresa."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "gold",
				onClick: onOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nova ordem (OS)"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Ordens abertas",
					value: String(orders.length - delivered).padStart(2, "0"),
					icon: ClipboardList
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Fornecedores",
					value: String(suppliers.length).padStart(2, "0"),
					icon: Building2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Itens cadastrados",
					value: String(items.length).padStart(2, "0"),
					icon: Boxes
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Valor total",
					value: money.format(orders.reduce((a, o) => a + Number(o.total), 0)),
					icon: CircleDollarSign
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded border border-border bg-card shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border bg-muted/50 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase",
					children: "Ordens recentes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [orders.length, " registros"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				plain: true,
				headers: [
					"Nº OS",
					"Data",
					"Total",
					"Status"
				],
				children: orders.slice(0, 6).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						strong: true,
						mono: true,
						children: o.order_number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: new Date(o.created_at).toLocaleDateString("pt-BR") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						mono: true,
						children: money.format(o.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, { value: o.status }) })
				] }, o.id))
			})]
		})
	] });
}
function Metric({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded border border-border bg-card p-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-mono text-2xl font-bold text-primary",
			children: value
		})]
	});
}
function PaginationFooter({ total, current, perPage, onChange }) {
	const pages = Math.ceil(total / perPage);
	if (pages <= 1) return null;
	const start = (current - 1) * perPage + 1;
	const end = Math.min(current * perPage, total);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-4 px-1 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted-foreground",
			children: [
				"Mostrando ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: start
				}),
				" a ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: end
				}),
				" de ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: total
				}),
				" resultados"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center space-x-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onChange(current - 1),
					disabled: current === 1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 size-4" }), "Anterior"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs font-medium text-muted-foreground px-2",
					children: [
						"Página ",
						current,
						" de ",
						pages
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onChange(current + 1),
					disabled: current === pages,
					children: ["Próximo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 size-4" })]
				})
			]
		})]
	});
}
function DataTable({ headers, children, plain = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: plain ? "overflow-x-auto" : "overflow-x-auto rounded border border-border bg-card shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[760px] text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-border bg-muted/50",
				children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
					children: h
				}, h))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-border",
				children
			})]
		})
	});
}
function Cell({ children, strong = false, mono = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: `px-5 py-3 text-sm ${strong ? "font-semibold text-foreground" : "text-muted-foreground"} ${mono ? "font-mono" : ""}`,
		children
	});
}
function Actions({ onEdit, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
		className: "px-5 py-2 text-right",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			onClick: onEdit,
			"aria-label": "Editar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			onClick: onDelete,
			"aria-label": "Excluir",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
		})]
	});
}
function Status({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `status-${value} inline-flex rounded px-2 py-1 text-[10px] font-bold uppercase`,
		children: value
	});
}
function RecordDialog({ kind, setKind, editingId, suppliers, items, orders, onSaved, createUser }) {
	const editingSupplier = suppliers.find((s) => s.id === editingId);
	const editingItem = items.find((i) => i.id === editingId);
	const editingOrder = orders.find((o) => o.id === editingId);
	const [lines, setLines] = (0, import_react.useState)([]);
	const [itemSearch, setItemSearch] = (0, import_react.useState)("");
	const [selectedItemId, setSelectedItemId] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (kind === "order") {
			setItemSearch("");
			setSelectedItemId("");
			if (editingId) supabase.from("purchase_order_items").select("*").eq("purchase_order_id", editingId).then(({ data }) => {
				if (data && data.length) setLines(data.map((oi) => ({
					itemId: oi.item_id || "",
					name: oi.item_name,
					quantity: oi.quantity,
					price: oi.unit_price
				})));
				else setLines([]);
			});
			else setLines([]);
		}
	}, [kind, editingId]);
	async function submit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		let error = null;
		try {
			if (kind === "supplier") {
				const payload = {
					company_name: String(fd.get("company_name")),
					cnpj: String(fd.get("cnpj") || "") || null,
					contact_name: String(fd.get("contact_name") || "") || null,
					email: String(fd.get("email") || "") || null,
					phone: String(fd.get("phone") || "") || null
				};
				const r = editingId ? await supabase.from("suppliers").update(payload).eq("id", editingId) : await supabase.from("suppliers").insert(payload);
				if (r.error) throw r.error;
			}
			if (kind === "item") {
				const payload = {
					name: String(fd.get("name")),
					description: String(fd.get("description") || "") || null,
					unit: String(fd.get("unit")),
					default_price: Number(fd.get("price")),
					supplier_id: String(fd.get("supplier") || "") || null
				};
				const r = editingId ? await supabase.from("items").update(payload).eq("id", editingId) : await supabase.from("items").insert(payload);
				if (r.error) throw r.error;
			}
			if (kind === "order") {
				const valid = lines.filter((l) => l.itemId && l.quantity > 0);
				const payload = {
					total: valid.reduce((a, l) => a + l.quantity * l.price, 0),
					supplier_id: null,
					status: String(fd.get("status")),
					notes: String(fd.get("notes") || "") || null
				};
				if (editingId) {
					const r = await supabase.from("purchase_orders").update(payload).eq("id", editingId);
					if (r.error) throw r.error;
					if (!editingOrder || editingOrder.status === "rascunho") {
						await supabase.from("purchase_order_items").delete().eq("purchase_order_id", editingId);
						if (valid.length) {
							const ir = await supabase.from("purchase_order_items").insert(valid.map((l) => ({
								purchase_order_id: editingId,
								item_id: l.itemId,
								item_name: l.name,
								quantity: l.quantity,
								unit_price: l.price
							})));
							if (ir.error) throw ir.error;
						}
					}
				} else {
					const { data: o, error: r } = await supabase.from("purchase_orders").insert(payload).select("id").single();
					if (r || !o) throw r ?? /* @__PURE__ */ new Error("Ordem não criada");
					if (valid.length) {
						const ir = await supabase.from("purchase_order_items").insert(valid.map((l) => ({
							purchase_order_id: o.id,
							item_id: l.itemId,
							item_name: l.name,
							quantity: l.quantity,
							unit_price: l.price
						})));
						if (ir.error) throw ir.error;
					}
				}
			}
			if (kind === "user") await createUser({ data: {
				fullName: String(fd.get("full_name")),
				email: String(fd.get("email")),
				password: String(fd.get("password")),
				role: String(fd.get("role"))
			} });
		} catch (e) {
			error = e instanceof Error ? e : /* @__PURE__ */ new Error("Não foi possível salvar.");
		}
		if (error) toast.error(error.message);
		else {
			toast.success("Salvo com sucesso.");
			setKind(null);
			onSaved();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(kind),
		onOpenChange: (o) => !o && setKind(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: kind === "order" ? "max-h-[90vh] max-w-4xl overflow-y-auto" : "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
				editingId ? "Editar" : "Novo",
				" ",
				kind === "supplier" ? "Fornecedor" : kind === "item" ? "Item / Produto" : kind === "order" ? "Ordem de Compra" : "Usuário"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Preencha os campos e confirme para salvar." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					kind === "supplier" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome da empresa *",
								name: "company_name",
								required: true,
								defaultValue: editingSupplier?.company_name ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CNPJ",
								name: "cnpj",
								defaultValue: editingSupplier?.cnpj ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Contato",
								name: "contact_name",
								defaultValue: editingSupplier?.contact_name ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-mail",
								name: "email",
								type: "email",
								defaultValue: editingSupplier?.email ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Telefone",
								name: "phone",
								defaultValue: editingSupplier?.phone ?? ""
							})
						]
					}),
					kind === "item" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome do item *",
								name: "name",
								required: true,
								defaultValue: editingItem?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Unidade *",
								name: "unit",
								required: true,
								defaultValue: editingItem?.unit ?? "Un"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preço padrão *",
								name: "price",
								type: "number",
								step: "0.01",
								required: true,
								defaultValue: editingItem?.default_price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								label: "Fornecedor",
								name: "supplier",
								defaultValue: editingItem?.supplier_id ?? "",
								options: suppliers.map((s) => ({
									value: s.id,
									label: s.company_name
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "description",
									defaultValue: editingItem?.description ?? ""
								})]
							})
						]
					}),
					kind === "order" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								label: "Status",
								name: "status",
								defaultValue: editingOrder?.status ?? "rascunho",
								options: [
									{
										value: "rascunho",
										label: "Rascunho"
									},
									{
										value: "aprovado",
										label: "Aprovado"
									},
									{
										value: "entregue",
										label: "Entregue"
									}
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: new Date(editingOrder?.created_at || Date.now()).toLocaleDateString("pt-BR"),
								disabled: true
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between bg-muted/50 px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "text-sm",
										children: "Itens da OS"
									})
								}),
								(!editingOrder || editingOrder.status === "rascunho") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-b border-border bg-muted/20 p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Buscar e inserir item" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "pl-9",
													placeholder: "Digite o nome do item para adicionar...",
													value: itemSearch,
													onChange: (e) => setItemSearch(e.target.value),
													autoComplete: "off"
												})]
											}),
											itemSearch.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover shadow-md",
												children: [items.filter((i) => i.name.toLowerCase().includes(itemSearch.toLowerCase())).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "flex w-full items-center border-b border-border px-4 py-2 text-sm last:border-0 hover:bg-accent hover:text-accent-foreground",
													onClick: () => {
														setLines([...lines, {
															itemId: it.id,
															name: it.name,
															quantity: 1,
															price: Number(it.default_price ?? 0)
														}]);
														setItemSearch("");
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col text-left",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold",
															children: it.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[10px] text-muted-foreground",
															children: ["Preço padrão: ", money.format(it.default_price)]
														})]
													})
												}, it.id)), items.filter((i) => i.name.toLowerCase().includes(itemSearch.toLowerCase())).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "px-4 py-3 text-sm text-muted-foreground",
													children: "Nenhum item encontrado."
												})]
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 p-4",
									children: [lines.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid items-end gap-3 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_auto]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: l.name || "Não encontrado",
												disabled: true
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fornecedor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: items.find((i) => i.id === l.itemId)?.supplier_id ? suppliers.find((s) => s.id === items.find((i) => i.id === l.itemId)?.supplier_id)?.company_name ?? "" : "",
												disabled: true
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Qtd.",
												name: `q-${idx}`,
												type: "number",
												step: "0.001",
												disabled: Boolean(editingOrder && editingOrder.status !== "rascunho"),
												value: l.quantity,
												onChange: (v) => setLines(lines.map((x, n) => n === idx ? {
													...x,
													quantity: Number(v)
												} : x))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Preço unit.",
												name: `p-${idx}`,
												type: "number",
												step: "0.01",
												disabled: Boolean(editingOrder && editingOrder.status !== "rascunho"),
												value: l.price,
												onChange: (v) => setLines(lines.map((x, n) => n === idx ? {
													...x,
													price: Number(v)
												} : x))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-9 items-center rounded border border-border bg-muted px-3 font-mono text-sm",
												children: money.format(l.quantity * l.price)
											})] }),
											(!editingOrder || editingOrder.status === "rascunho") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												onClick: () => setLines(lines.filter((_, n) => n !== idx)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
											})
										]
									}, idx)), lines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-4 text-center text-sm text-muted-foreground",
										children: "Nenhum item inserido."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border bg-primary/5 px-4 py-3 text-right font-bold text-primary",
									children: ["Valor total: ", money.format(lines.reduce((a, l) => a + l.quantity * l.price, 0))]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observações" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "notes",
							defaultValue: editingOrder?.notes ?? ""
						})] })
					] }),
					kind === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome completo *",
								name: "full_name",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-mail *",
								name: "email",
								type: "email",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Senha temporária *",
								name: "password",
								type: "password",
								minLength: 8,
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								label: "Nível de acesso",
								name: "role",
								defaultValue: "comprador",
								options: [{
									value: "comprador",
									label: "Comprador"
								}, {
									value: "admin",
									label: "Administrador"
								}]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setKind(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Salvar"
					})] })
				]
			})]
		})
	});
}
function Field({ label, name, value, onChange, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			...value !== void 0 ? {
				value,
				onChange: (e) => onChange?.(e.target.value)
			} : {},
			...props
		})]
	});
}
function NativeSelect({ label, name, options, defaultValue, value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			id: name,
			name,
			disabled,
			className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50",
			defaultValue: value === void 0 ? defaultValue : void 0,
			value,
			onChange: (e) => onChange?.(e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Selecione"
			}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.value,
				children: o.label
			}, o.value))]
		})]
	});
}
async function exportPdf(order, items, suppliers) {
	const { data: orderItems } = await supabase.from("purchase_order_items").select("*").eq("purchase_order_id", order.id);
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const { default: autoTable } = await import("../_libs/jspdf-autotable.mjs").then((n) => n.t);
	const doc = new jsPDF();
	doc.setFontSize(18);
	doc.setTextColor(0, 51, 160);
	doc.text("GOLD CONTABILIDADE", 14, 18);
	doc.setFontSize(9);
	doc.setTextColor(80);
	doc.text("Assessoria contábil e serviços", 14, 24);
	doc.setFontSize(14);
	doc.setTextColor(20);
	doc.text(`Ordem de Compra ${order.order_number}`, 14, 38);
	autoTable(doc, {
		startY: 46,
		head: [[
			"Data",
			"Status",
			"Valor total"
		]],
		body: [[
			new Date(order.created_at).toLocaleDateString("pt-BR"),
			order.status.toUpperCase(),
			money.format(order.total)
		]],
		theme: "grid",
		headStyles: { fillColor: [
			0,
			51,
			160
		] }
	});
	if (orderItems && orderItems.length) autoTable(doc, {
		startY: doc.lastAutoTable.finalY + 10,
		head: [[
			"Item",
			"Fornecedor",
			"Qtd.",
			"Preço",
			"Subtotal"
		]],
		body: orderItems.map((oi) => {
			const it = items.find((i) => i.id === oi.item_id);
			const sup = it?.supplier_id ? suppliers.find((s) => s.id === it.supplier_id)?.company_name : "";
			return [
				oi.item_name,
				sup || "N/A",
				oi.quantity.toString(),
				money.format(oi.unit_price),
				money.format(oi.quantity * oi.unit_price)
			];
		}),
		theme: "grid"
	});
	doc.setFontSize(9);
	doc.text("Documento emitido pelo Sistema de Gestão de Compras — GOLD CONTABILIDADE", 14, 282);
	return doc;
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcurementApp, {});
}
//#endregion
export { Index as component };
