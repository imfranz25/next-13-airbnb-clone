import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';

export const CATEGORIES = [
  {
    id: 'category-001',
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    id: 'category-002',
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  {
    id: 'category-003',
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property has modern design!',
  },
  {
    id: 'category-004',
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in countryside!',
  },
  {
    id: 'category-005',
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool!',
  },
  {
    id: 'category-006',
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on the island!',
  },
  {
    id: 'category-007',
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!',
  },
  {
    id: 'category-008',
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    id: 'category-009',
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in the castle!',
  },
  {
    id: 'category-010',
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities!',
  },
  {
    id: 'category-011',
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in the arctic!',
  },
  {
    id: 'category-012',
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is a cave!',
  },
  {
    id: 'category-013',
    label: 'Dessert',
    icon: GiCactus,
    description: 'This property is in the dessert!',
  },
  {
    id: 'category-014',
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn!',
  },
  {
    id: 'category-014=5',
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious!',
  },
];
