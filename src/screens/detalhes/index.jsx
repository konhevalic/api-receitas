import DetalhesReceita from '../../components/detalhesReceita';

const Detalhes = ({ navigation, route }) => {

  //Nesta tela possui apenas 1 componente que renderiza todos os detalhes de uma receita.
  
  return (
    <DetalhesReceita
      navigation={navigation}
      route={route}
    />
  );
}

export default Detalhes;
