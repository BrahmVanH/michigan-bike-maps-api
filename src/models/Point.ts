import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, BaseEntity } from 'typeorm';
import { Point, LineString } from 'geojson';
import { ObjectType, Field, ID } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

// First, create custom scalars for your GeoJSON types
@ObjectType('GeoJSONPoint')
export default class GeoJSONPointType {
	@Field()
	type: string;

	@Field(() => [Number])
	coordinates: number[];
}
