import { Menu } from "./menu";
import { Search } from "./search";
import { ShoppingCart } from "./shopping-cart";

interface Props {
  pageNavigationData: PageNavigationData[];
  pageDataList: PageData[];
}

export function Navbar({ pageNavigationData, pageDataList }: Props) {
  return (
    <div className="h-14 px-4 bg-background items-center grid grid-cols-[1fr_40px_40px] gap-2 md:grid-cols-[192px_1fr_192px] sticky top-0 inset-x-0 z-10">
      <Menu pageNavigationData={pageNavigationData} />
      <Search pageDataList={pageDataList} />
      <ShoppingCart />
    </div>
  );
}
