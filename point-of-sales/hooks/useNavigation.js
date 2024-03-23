import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

export const useNavigation = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return {
    router,
    params,
    searchParams,
    pathname,
    open,
    setOpen,
    active,
    setActive,
  };
};
