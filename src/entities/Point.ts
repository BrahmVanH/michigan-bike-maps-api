import { TrackOrm } from '@/generated/graphql';
import { ObjectType, Field } from 'type-graphql';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import TrackORM from './Track';

// @ObjectType('GeoJSONPoint')
// export default class GeoJSONPointType {
// 	@Field()
// 	type: 'Point';

// 	@Field(() => [Number])
// 	coordinates: number[];
// }

@ObjectType('TrackPoint')
export default class TrackPointType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('decimal', { precision: 10, scale: 7 })
	latitude: number;

	@Column('decimal', { precision: 10, scale: 7 })
	longitude: number;

	@Column('decimal', { precision: 5, scale: 1, nullable: true })
	elevation: number;

	@Column()
	timestamp: Date;

	@ManyToOne((type) => TrackORM, (track) => track.trackPoints)
	track: TrackORM;
}
