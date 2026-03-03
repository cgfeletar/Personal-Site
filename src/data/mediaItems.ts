import introtoawsImg from '../assets/introtoaws.png';
import juniordevImg from '../assets/juniordev.png';
import brownbagImg from '../assets/brownbag.png';
import learntocodeImg from '../assets/learntocode.png';
import codenewbieImg from '../assets/codenewbie.png';
import compsciImg from '../assets/compsci.png';
import type { MediaItem } from '../types';

export const mediaItems: MediaItem[] = [
  {
    id: 'm4',
    type: 'youtube',
    gradient: 'dark',
    thumb: introtoawsImg,
    showName: 'Collab Lab',
    title: 'Tech Talk: Intro to AWS',
    desc: 'A tech talk breaking down core AWS services for developers new to cloud infrastructure.',
    date: 'Nov 2020',
    href: 'https://youtu.be/Xul4dWFMZm0?si=Pi2XzR2v4gq0SaER&t=1421',
  },
  {
    id: 'm5',
    type: 'youtube',
    gradient: 'sage',
    thumb: juniordevImg,
    showName: 'DonutJS',
    title: 'How to Support the Junior Developer on your Team',
    desc: 'A talk on mentorship, onboarding, and what senior devs can do to help juniors actually thrive.',
    date: 'Feb 2020',
    href: 'https://youtu.be/emZGYOD_z_c?si=FsKeQwdZCx8DISUs',
  },
  {
    id: 'm6',
    type: 'youtube',
    gradient: 'rose',
    thumb: brownbagImg,
    showName: 'vBrownBag',
    title: 'From Technically Challenged to Happy (and Paid) Developer',
    desc: 'My career change story — from knowing nothing about tech to landing my first developer job.',
    date: 'June 2021',
    href: 'https://youtu.be/CHc81b7omG8?si=wlGI3rFbmL-bt1sf',
  },
  {
    id: 'm1',
    type: 'podcast',
    gradient: 'sage',
    thumb: learntocodeImg,
    showName: 'Learn to Code With Me',
    title: 'An Unexpected Shift from Selling Beer to Coding Bootcamp',
    desc: 'How a career in beer sales led to a bootcamp rejection, a pivot, and eventually a job as a software developer.',
    date: 'Jun 2020',
    href: 'https://learntocodewith.me/podcast/selling-beer-to-coding-bootcamp-caitlyn-greffly/',
  },
  {
    id: 'm2',
    type: 'podcast',
    gradient: 'tc',
    thumb: codenewbieImg,
    showName: 'CodeNewbie',
    title: "What your bootcamp isn't teaching you",
    desc: 'The job search skills bootcamps skip — and how to fill the gaps so you actually get hired.',
    date: 'Aug 2022',
    href: 'https://www.codenewbie.org/podcast/what-your-bootcamp-isn-t-teaching-you',
  },
  {
    id: 'm3',
    type: 'podcast',
    gradient: 'rose',
    thumb: compsciImg,
    showName: 'Just the Useful Bits',
    title: "It's Like Being Paid to Go to School and Make Cool Things Forever",
    desc: 'On making the leap into software and why writing code still feels like a gift, not a job.',
    date: 'Apr 2021',
    href: 'https://justtheusefulbits.com/jtub/caitlyn-greffly-paid-to-go-to-school-and-make-cool-things-forever/',
  },
];
