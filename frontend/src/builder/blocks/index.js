import HeroBlock from './HeroBlock';
import FeatureBlock from './FeatureBlock';
import GalleryBlock from './GalleryBlock';
import TestimonialBlock from './TestimonialBlock';
import FooterBlock from './FooterBlock';

export const BLOCKS = [
  {
    type: 'Hero',
    name: 'Hero Section',
    icon: '🌟',
    component: HeroBlock
  },
  {
    type: 'Feature',
    name: 'Features',
    icon: '✨',
    component: FeatureBlock
  },
  {
    type: 'Gallery',
    name: 'Gallery',
    icon: '🖼️',
    component: GalleryBlock
  },
  {
    type: 'Testimonial',
    name: 'Testimonial',
    icon: '💬',
    component: TestimonialBlock
  },
  {
    type: 'Footer',
    name: 'Footer',
    icon: '🔻',
    component: FooterBlock
  }
];
