import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, BaseEntity } from 'typeorm';
import { Point, LineString } from 'geojson';
import { ObjectType, Field, ID } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('GeoJSONLineString')
export default class GeoJSONLineStringType {
	@Field()
	type: string;

	@Field(() => [[Number]])
	coordinates: number[][];
}
