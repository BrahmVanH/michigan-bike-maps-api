import { ObjectType, Field } from 'type-graphql';

// First, create custom scalars for your GeoJSON types
@ObjectType('GeoJSONPoint')
export default class GeoJSONPointType {
	@Field()
	type: 'Point';

	@Field(() => [Number])
	coordinates: number[];
}
