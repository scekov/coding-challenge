import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { ConnectionStatus } from '@/models/ConnectionStatus';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';
import { DateTime, getLocaleString } from '@/lib/dateTime';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  const status =
    door.connectionStatus === ConnectionStatus.Online ? 'success' : 'error';

  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      {door.apartmentName && (
        <DetailPageItem label="Apartment">
          <Typography>{door.apartmentName}</Typography>
        </DetailPageItem>
      )}
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <Typography color={`${status}.main`}>
          {door.connectionStatus}
        </Typography>
      </DetailPageItem>
      <DetailPageItem label="Last connection status update">
        <Typography>
          {getLocaleString(
            door.lastConnectionStatusUpdate,
            DateTime.DATETIME_MED_WITH_SECONDS,
          )}
        </Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
