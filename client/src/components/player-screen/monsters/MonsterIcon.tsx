interface MonsterIconProps {
  name: string;
  image: string;
}

//This is used for displaying the little icons the player will be able to click. To choose a monster.
// It still needs to be clickable and stylised
export const MonsterIcon = ({ name, image }: MonsterIconProps) => {
  return (
    <div>
      <img src={image} alt="Monster image" />
      <h3>{name}</h3>
    </div>
  );
};
