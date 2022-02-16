import { Wrapper, Arrow } from './styles';

const arrows_number = 10;

const Arrows = () => {
  return (
    <Wrapper>
      {new Array(arrows_number).fill().map((_, index) => (
        <Arrow
          key={index}
          className={`arrow arrow-${arrows_number - index - 1}`}
        />
      ))}
    </Wrapper>
  );
};

export default Arrows;
