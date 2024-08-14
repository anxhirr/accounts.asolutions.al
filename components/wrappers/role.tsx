import { Role } from "@/supabase/migrations/validation";
import { getFromHeaders } from "@/utils";

export const RoleWrapper = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole: Role;
}) => {
  const { memberRole } = getFromHeaders();

  if (memberRole !== requiredRole) return null;

  return <>{children}</>;
};
