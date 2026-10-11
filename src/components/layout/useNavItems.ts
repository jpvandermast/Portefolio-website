import { NAV_ITEMS, PROJECTEN_ITEM } from '../../data/navigation';
import { useProjecten } from '../../lib/ProjectenContext';

/** Menu-items; Projecten alleen als er zichtbare rijen zijn. */
export function useNavItems() {
  const { projecten } = useProjecten();
  return projecten.length > 0 ? [...NAV_ITEMS.slice(0, 3), PROJECTEN_ITEM, NAV_ITEMS[3]] : NAV_ITEMS;
}
