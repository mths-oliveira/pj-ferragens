import { useRouter as Router } from 'next/router';

interface Query {
  ref: string;
  category: string;
}

interface Router {
  query: Query;
  absolutePath: string;
  setPath: (path: string, isShallow?: boolean) => void;
}

export function useRouter(): Router {
  const router = Router();
  const [absolutePath] = router.asPath.split('?');

  function setPath(path: string, isShallow = false) {
    router.push(path, null, {
      shallow: isShallow,
      scroll: !isShallow,
    });
  }

  return {
    setPath,
    absolutePath,
    query: {
      ref: String(router.query.ref),
      category: String(router.query.category),
    },
  };
}
