// src/script.ts

// Importa o "tradutor" do Prisma
import { PrismaClient } from '@prisma/client';

// Inicializa o Prisma (cria o "controle remoto" do banco)
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando script CRUD completo...');


  // 1. CREATE (Criar)
  console.log('\n--- 1. CREATE ---');

  // Criar um usuário
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome: 'Ana Silva',
      email: 'ana@email.com',
    },
  });
  console.log('Usuário Criado:', novoUsuario);

  // Criar uma tarefa e já relacionar ao usuário
  const novaTarefa = await prisma.tarefa.create({
    data: {
      descricao: 'Estudar Node.js',
      idUsuario: novoUsuario.id, // Conecta a tarefa ao usuário
    },
  });
  console.log('Tarefa Criada:', novaTarefa);


  // 2. READ (Ler)
  console.log('\n--- 2. READ ---');

  // Busca um usuário pelo 'id' e 'inclui' suas tarefas (faz o JOIN)
  const usuarioComTarefas = await prisma.usuario.findUnique({
    where: {
      id: novoUsuario.id,
    },
    include: {
      tarefas: true, // Traz a lista de tarefas relacionadas
    },
  });
  console.log('Usuário com tarefas:', usuarioComTarefas);

  // Busca todas as tarefas
  const todasTarefas = await prisma.tarefa.findMany();
  console.log('Total de tarefas no banco:', todasTarefas.length);


  // 3. UPDATE (Atualizar)
  console.log('\n--- 3. UPDATE ---');

  // Atualiza uma tarefa específica pelo 'id'
  const tarefaAtualizada = await prisma.tarefa.update({
    where: {
      id: novaTarefa.id,
    },
    data: {
      descricao: 'Estudar novamente Node.js', // Novo valor
    },
  });
  console.log('Tarefa Atualizada:', tarefaAtualizada);


  // 4. DELETE (Deletar)
  console.log('\n--- 4. DELETE ---');

  // Deleta um usuário pelo 'id'
  // Nota: Como definimos "onDelete: Cascade" no schema,
  // o banco de dados irá deletar AUTOMATICAMENTE as tarefas dele.
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      id: novoUsuario.id,
    },
  });
  console.log('Usuário Deletado:', usuarioDeletado);

  // Tenta buscar a tarefa deletada (para provar que sumiu)
  const tarefaDeletada = await prisma.tarefa.findUnique({
    where: {
      id: novaTarefa.id,
    },
  });
  console.log('Tarefa (deve ser null):', tarefaDeletada); // Deve ser null

  console.log('\nScript CRUD concluído.');
}

// Executa a função main e garante que o Prisma feche a conexão
main()
  .catch((e) => {
    console.error('Ocorreu um erro:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect();
  });
