import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, BaseEntity } from 'typeorm';
import { Point, LineString } from 'geojson';
import { ObjectType, Field, ID } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import GeoJSONLineStringType from './LineString';
import GeoJSONPointType from './Point';

@ObjectType('TrackProperties')
class TrackPropertiesType {
	@Field(() => [Number])
	elevations: number[];

	@Field(() => [String])
	timestamps: string[];

	@Field()
	distance: number;

	@Field()
	duration: number;

	@Field({ nullable: true })
	avgSpeed?: number;
}

@Entity({ name: 'tracks' })
@ObjectType()
export default class TrackORM extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@Field(() => String)
	@Column('text')
	name: string;

	@Field(() => Date)
	@CreateDateColumn()
	recordedAt: Date;

	// The actual GPS track
	@Field(() => GeoJSONLineStringType)
	@Column('geometry', {
		spatialFeatureType: 'LineString',
		srid: 4326, // WGS84 coordinate system
	})
	@Index({ spatial: true })
	route: LineString;

	@Field(() => TrackPropertiesType, { nullable: true })
	@Column('jsonb', { nullable: true })
	properties: {
		elevations: number[];
		timestamps: string[];
		distance: number;
		duration: number;
		avgSpeed?: number;
	};

	@Field(() => GeoJSONPointType)
	@Column('geometry', {
		spatialFeatureType: 'Point',
		srid: 4326,
	})
	@Index({ spatial: true })
	startPoint: Point;

	@Field(() => GeoJSONPointType)
	@Column('geometry', {
		spatialFeatureType: 'Point',
		srid: 4326,
	})
	@Index({ spatial: true })
	endPoint: Point;

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true })
	description?: string;

	@Field(() => [String])
	@Column('text', { array: true, default: [] })
	tags: string[];
}
