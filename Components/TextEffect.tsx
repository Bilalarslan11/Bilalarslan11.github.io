import { TypeAnimation } from 'react-type-animation';

const TextEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        'Senior Developer',
        1000,
        'Frontend Lead',
        1000,
        'Fullstack Engineer',
        1000,
        'Software Engineer',
        1000,
        'Master of Science',
        1000
      ]}
      wrapper="span"
      speed={50}
      className='text-[2rem] md:text-[3rem] text-[#55e6a5] font-bold uppercase'
      repeat={Infinity}
    />
  );
};

export default TextEffect;