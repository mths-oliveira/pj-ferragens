export function getPageNavigationData(
  pageDataList: PageData[]
): PageNavigationData[] {
  const pageNavigationDataList: PageNavigationData[] = pageDataList.map(
    (pageData) => {
      const pathname = `/produtos/${pageData.id}`;
      const pageNavigationData: PageNavigationData = {
        title: pageData.title,
        pathname,
        sections: pageData.sections.map((section) => ({
          title: section.title,
          pathname: `${pathname}#${section.id}`,
        })),
      };
      return pageNavigationData;
    }
  );
  return pageNavigationDataList;
}
