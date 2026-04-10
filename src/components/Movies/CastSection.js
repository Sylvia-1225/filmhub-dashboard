'use client';

import { getImageUrl } from '@/services/tmdbService';
import {
  CastList,
  CastCard,
  CastAvatar,
  CastName,
  CastCharacter,
  SectionTitle,
} from './styled';

export default function CastSection({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <>
      <SectionTitle level={3}>演員陣容</SectionTitle>
      <CastList>
        {cast.map((person) => (
          <CastCard key={person.id}>
            <CastAvatar
              src={getImageUrl(person.profile_path, 'medium')}
              alt={person.name}
            />
            <CastName>{person.name}</CastName>
            <CastCharacter>{person.character}</CastCharacter>
          </CastCard>
        ))}
      </CastList>
    </>
  );
}
