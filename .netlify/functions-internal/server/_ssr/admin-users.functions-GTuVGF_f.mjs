import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-users.functions-GTuVGF_f.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var createManagedUser_createServerFn_handler = createServerRpc({
	id: "49198f9569992241160390da04915e137a25b16c5e203c54d233c906622e510e",
	name: "createManagedUser",
	filename: "src/lib/admin-users.functions.ts"
}, (opts) => createManagedUser.__executeServer(opts));
var createManagedUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => createUserSchema.parse(data)).handler(createManagedUser_createServerFn_handler, async ({ data, context }) => {
	const { data: role } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (!role) throw new Error("Apenas administradores podem criar usuários.");
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
		email: data.email,
		password: data.password,
		email_confirm: true,
		user_metadata: { full_name: data.fullName }
	});
	if (error || !created.user) throw new Error(error?.message ?? "Não foi possível criar o usuário.");
	const { error: profileError } = await supabaseAdmin.from("profiles").insert({
		id: created.user.id,
		full_name: data.fullName,
		email: data.email
	});
	const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
		user_id: created.user.id,
		role: data.role
	});
	if (profileError || roleError) throw new Error(profileError?.message ?? roleError?.message);
	return { ok: true };
});
//#endregion
export { createManagedUser_createServerFn_handler };
