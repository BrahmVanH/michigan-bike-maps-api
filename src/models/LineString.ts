import { ObjectType, Field } from 'type-graphql';

@ObjectType('GeoJSONLineString')
export default class GeoJSONLineStringType {
	@Field()
	type: 'LineString';

	@Field(() => [[Number]])
	coordinates: number[][];
}
