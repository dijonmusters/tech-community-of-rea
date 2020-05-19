import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({
  secret: 'fnADsNg0flACAVV6_zzgO5kq9VPwmD8Qv-MtHuTK',
});

const characters = async () => {
  const { data: documents } = await client.query(
    q.Map(q.Paginate(q.Match(q.Index('all_characters'))), (ref) => q.Get(ref))
  );

  return documents.map(({ ref, data }) => ({
    id: ref.id,
    ...data,
  }));
};

const character = async (_, { input: { id } }) => {
  try {
    const document = await client.query(
      q.Get(q.Match(q.Index('character'), id))
    );

    return {
      id: document.ref.id,
      ...document.data,
    };
  } catch (error) {
    return null;
  }
};

const createCharacter = async () => {
  const document = await client.query(
    q.Create(q.Collection('characters'), { data: {} })
  );

  return {
    id: document.ref.id,
    ...document.data,
  };
};

const updateCharacter = async (_, { input: characterInput }) => {
  const { id, ...character } = characterInput;
  const document = await client.query(
    q.Update(q.Ref(q.Collection('characters'), id), {
      data: character,
    })
  );

  return {
    id: document.ref.id,
    ...document.data,
  };
};

export { characters, character, createCharacter, updateCharacter };
