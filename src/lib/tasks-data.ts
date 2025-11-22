
export const unifiedTasks = [
    // Fase: Planejamento
    {
      id: "plan-1",
      title: "Coleta de configuração dos switches legados",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-2",
      title: "Análise dos arquivos coletados (configurações, CDP/LLDP)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-3",
      title: "Análise de saúde da rede (portas com erros CRC, STP, UDLD, etc.)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-4",
      title: "Desenho da topologia lógica",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-5",
      title: "Mapeamento detalhado de portas (PORT_MAPPING_RPO25_ACCESS.xlsx)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-6-1",
      title: "Script de Onboarding",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM",
    },
    {
      id: "plan-6-2",
      title: "Script de Optimization",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM",
    },
    {
      id: "plan-6-3",
      title: "Script Python para identificação de APs",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM",
    },
    {
      id: "plan-7",
      title: "Criação e validação dos Templates de configuração",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-8",
      title: "Criação do Site e cadastro dos equipamentos no iMaster NCE Campus",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-9",
      title: "Teste dos templates no ambiente de laboratório (TENANT-LAB)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-10",
      title: "Criação da MOP (Method of Procedure)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
    {
      id: "plan-11",
      title: "Abertura e aprovação da RFC (com revisão e validação por Huawei e BB)",
      phase: "planejamento",
      phaseTitle: "Planejamento",
      responsible: "ZOOM"
    },
  
    // Fase: Preparação
    {
      id: "prep-1",
      title: "Chegada dos técnicos",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-2",
      title: "Checklist de equipamentos (Rotuladora, cabo console, usb com dados de update)",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-3",
      title: "Enviar os técnico para localizar os equipamentos (criar um documento com informações do andar e disponibilidade de portas de cada equipamento)",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-4",
      title: "Fazer uma tabela de relação do número de série do equipamento legado com o número de bem",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-5",
      title: "Enviar um dos técnicos para rotular os cabos",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-6",
      title: "Enviar um técnico para montagem dos switches de DIST",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-7",
      title: "Pedir para o técnico abrir o teams e compartilhar a tela para acesso remoto",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-8",
      title: "Confirmar montagem de todos os switches DIST",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-9",
      title: "pedir ao técnico para conectar o usb no switch de DIST e o cabo console para acesso remoto",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "Field"
    },
    {
      id: "prep-10",
      title: "Executar a configuração do Stack no DIST 1",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-11",
      title: "Executar a configuração do Stack no DIST 2",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-12",
      title: "Solicitar ao técnico para conectar o cabo de stack nos DISTS",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-13",
      title: "Confirmar instalação do Stack",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-14",
      title: "Rodar script de atualização",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-15",
      title: "Solicitar ao técnico a montagem dos demais switches",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-16",
      title: "Rodar script de onboarding",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
    {
      id: "prep-17",
      title: "Após montagem dos switches de acesso repetir os passos de configuração de STACK se necessário, e depois atualização e onboarding",
      phase: "preparacao",
      phaseTitle: "Preparação",
      responsible: "ZOOM"
    },
  
    // Fase: Migração
    {
      id: "mig-1-1",
      title: "Criar pasta do site dentro da pasta 'Rollout'",
      phase: "migracao",
      phaseTitle: "Migração",
      responsible: "ZOOM/Field"
    },
    {
      id: "mig-1-2",
      title: "Acessar ferramenta NNMI",
      phase: "migracao",
      phaseTitle: "Migração",
      responsible: "ZOOM"
    },
    {
      id: "mig-1-3",
      title: "Identificar site a ser migrado e coletar IPs ou ranges",
      phase: "migracao",
      phaseTitle: "Migração",
      responsible: "ZOOM"
    },
  ];
