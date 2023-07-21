import { Pipe, PipeTransform } from '@angular/core';
import { Bien } from '../entities/bien';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(users: Bien[], ...searchArgs: string[]): Bien[] {
    if (!this.isValidArray(users)) return users;
    if (!this.hasValidSearchQuery(searchArgs)) return users;

    const [query, ...properties]: string[] = searchArgs;
    const lowerQuery = query.toLowerCase();

    return this.filterString(users, lowerQuery, properties);
  }

  private isValidArray(users: Bien[]) {
    return Array.isArray(users);
  }
  private hasValidSearchQuery(searchArgs: string[]): boolean {
    const [query] = searchArgs;
    return !(!query || query.length < 3);
  }

  private filterString(
    users: Bien[],
    lowerQuery: string,
    properties: string[]
  ): Bien[] {
    return users.filter((user) =>
      properties
        .flat()
        .some(
          (property) =>
            user.categoria.cat_nombre.toLowerCase().includes(lowerQuery) ||
            user.ubicacion.ubi_nombre.toLowerCase().includes(lowerQuery) ||
            user.bien_descripcion.toLowerCase().includes(lowerQuery)
        )
    );
  }
}
