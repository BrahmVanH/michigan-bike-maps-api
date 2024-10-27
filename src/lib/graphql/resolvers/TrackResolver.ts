import { Resolver, Query } from 'type-graphql';
import TrackORM from '@/models/track';

@Resolver()
export class TrackResolver {
	@Query(() => String)
	async tracks() {
		return TrackORM.find();
	}
}
